import { ctx } from './__helper';
import { initial_users } from './data';
import { login, me as meQuery } from './graphql';

// const ctx = createTestContext();

describe('User Services', () => {
  /**
   * Before all the User test, login to a user to manipulate surveys.
   * This would be better as a beforeAll, but as described at https://jestjs.io/docs/en/setup-teardown,
   * the ordering is such that that is not an option.
   */

  beforeAll(async () => {
    const adminUserCreds = initial_users.reduce((current, next) => (next.type === 'admin' ? next : current));

    const user_token = await ctx.client.send(login(adminUserCreds)).then((r) => r?.login?.token);

    ctx.client.headers.set('authorization', `Bearer ${user_token}`);
  });

  describe('Happy Path', () => {
    it('When a user queries with a valid token, they receive a user object', async () => {
      const response = await ctx.client.send(meQuery);

      const { me } = response;
      expect(me).toBeInstanceOf(Object);
      expect(me.first_name).toBe('Michael');
      expect(me.last_name).toBe('Gardner');
    });
  });
  /**
   * Delete auth token after all test.
   */
  afterAll(async () => {
    ctx.client.headers.del('authorization');
  });
});
