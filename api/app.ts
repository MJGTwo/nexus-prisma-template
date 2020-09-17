import 'babel-polyfill';

import * as Express from 'express';
import * as bodyParser from 'body-parser';
import { server, log } from 'nexus';
import cors from 'cors';

// import { rules, options } from './permissions';
import { prisma as client } from './services/prisma.service';

// import { APP_SECRET } from './util';

import { use } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { auth } from 'nexus-plugin-jwt-auth';
import { shield } from 'nexus-plugin-shield';

use(prisma({ migrations: false, features: { crud: true }, client: { instance: client } }));

// use(auth({ appSecret: APP_SECRET }));
// use(shield({ rules, options }));

server.express.use(Express.static('public'));
server.express.use(cors());
server.express.use(bodyParser.json());
server.express.use(cors());
server.express.use(bodyParser.urlencoded({ extended: false }));
