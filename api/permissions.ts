import { rule, allow } from 'nexus-plugin-shield';
import { getUserID } from './util';
import { prisma } from './services/prisma.service';

const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, ctx, _info) => {
  const userID = getUserID(ctx.token);
  const user = await prisma.user.findOne({ where: { id: userID } });
  return Boolean(user);
});
const rules = {
  Query: {
    '*': isAuthenticated,
  },
  Mutation: {
    '*': isAuthenticated,
    login: allow,
    signup: allow,
  },
};

const options = {
  allowExternalErrors: true,
};
export { rules, options };
