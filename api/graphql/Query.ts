import { schema } from 'nexus';
import { getUserID } from '../util';

export const Query = schema.queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { db, token }) => {
        const userId = getUserID(token);
        if (!userId) {
          throw new Error('Invalid userID');
        }
        return db.user.findOne({
          where: {
            id: parseInt(userId),
          },
        });
      },
    });

    t.list.field('feed', {
      type: 'Post',
      resolve: (_parent, _args, { db }) =>
        db.post.findMany({
          where: { published: true },
        }),
    });

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: schema.stringArg({ nullable: false }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.db.post.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                content: {
                  contains: searchString,
                },
              },
            ],
          },
        });
      },
    });
    t.crud.post();
  },
});
