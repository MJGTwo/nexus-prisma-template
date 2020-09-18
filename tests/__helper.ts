import { createTestContext as originalCreateTestContext, TestContext } from 'nexus/testing';

const randomPort = (min = 49152, max = 65535) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
process.env.PORT = `${randomPort()}`;

export function createTestContext(): TestContext {
  let ctx = {} as TestContext;
  beforeAll(async () => {
    Object.assign(ctx, await originalCreateTestContext());
    console.log('starting app', process.env.PORT);
    await ctx.app.start();
  });
  afterAll(async () => {
    //@ts-ignore
    await ctx.app.db.client.$disconnect();
    await ctx.app.stop();
  });
  return ctx;
}
export const ctx = createTestContext();
