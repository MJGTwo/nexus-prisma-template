import { compare, hash } from 'bcryptjs';
import { schema } from 'nexus';
import { createToken, getUserID } from '../util';

export const Mutation = schema.mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        first_name: schema.stringArg({ required: true }),
        last_name: schema.stringArg({ required: true }),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { first_name, last_name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.db.user.create({
          data: {
            first_name,
            last_name,
            email,
            password: hashedPassword,
          },
        });
        return {
          token: await createToken({ user }),
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, context) => {
        const user = await context.db.user.findOne({
          where: {
            email,
          },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: await createToken({ user }),
          user,
        };
      },
    });
  },
  //     t.field('createDraft', {
  //       type: 'Post',
  //       args: {
  //         title: schema.stringArg({ nullable: false }),
  //         content: schema.stringArg(),
  //       },
  //       resolve: (parent, { title, content }, ctx) => {
  //         const userId = getUserID(ctx.token);
  //         if (!userId) {
  //           throw new Error('Invalid userId');
  //         }

  //         return ctx.db.post.create({
  //           data: {
  //             title,
  //             content,
  //             published: false,
  //             author: { connect: { id: Number.parseInt(userId) } },
  //           },
  //         });
  //       },
  //     });

  //     t.field('deletePost', {
  //       type: 'Post',
  //       nullable: true,
  //       args: { id: schema.intArg() },
  //       resolve: (parent, { id }, ctx) => {
  //         return ctx.db.post.delete({
  //           where: {
  //             id,
  //           },
  //         });
  //       },
  //     });

  //     t.field('publish', {
  //       type: 'Post',
  //       nullable: true,
  //       args: { id: schema.intArg() },
  //       resolve: (parent, { id }, ctx) => {
  //         return ctx.db.post.update({
  //           where: { id },
  //           data: { published: true },
  //         });
  //       },
  //     });
  //   },
});
