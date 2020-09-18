const { defaults } = require('jest-config');
const path = require('path');
module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: { warnOnly: true },
    },
  },
  testTimeout: 10000,
  testEnvironment: './tests/nexus-test-environment.js',
  collectCoverage: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/api/schema.ts', '/api/graphql/models/', 'tests/__*'],
  coverageDirectory: 'coverage',
  modulePaths: ['api'],
};
