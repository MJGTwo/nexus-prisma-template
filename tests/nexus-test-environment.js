const mysql = require('mysql');
const NodeEnvironment = require('jest-environment-node');
const { nanoid } = require('nanoid');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const prismaBinary = './node_modules/.bin/prisma';

const randomPort = (min = 49152, max = 65535) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class PrismaTestEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const id = nanoid();
    this.schema = `test_${id}`;

    this.connectionInfo = {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'testdb',
      port: '3307',
    };
    const { host, user, password, database, port } = this.connectionInfo;
    this.databaseUrl = `mysql://${user}:${password}@${host}:${port}/${this.schema}`;
  }

  async setup() {
    process.env.DATABASE_URL = this.databaseUrl;
    this.global.process.env.DATABASE_URL = this.databaseUrl;

    console.log(`setup${this.schema} ${process.env.DATABASE_URL}`);
    await exec(`yes | DATABASE_URL=${this.databaseUrl} ${prismaBinary} migrate up --experimental --create-db`);
    await exec(`yarn seed`);

    return super.setup();
  }

  async teardown() {
    const { host, user, password, database, port } = this.connectionInfo;
    console.log('teardown', this.schema);
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database: this.schema,
      port,
    });

    await connection.query(`DROP DATABASE IF EXISTS \`${this.schema}\``);
    await connection.end();
  }
}

module.exports = PrismaTestEnvironment;
