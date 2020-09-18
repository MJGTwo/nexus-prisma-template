import { signup, login } from './graphql';

import { ctx } from './__helper';

// const ctx = createTestContext();

describe('Authentication Service', () => {
  describe('Happy Path', () => {
    /**
     * Test the happy login path.
     */

    it('When the correct credentials are given, the user is logged in.', async () => {
      const credentials = {
        email: 'mary@ippsec.io',
        password: 'PassWord123',
      };

      const login_res = await ctx.client.send(login(credentials));
      expect(login_res?.login).toBeInstanceOf(Object);

      const { user, token } = login_res.login;

      expect(user?.email).toBe(credentials.email);
      expect(typeof user.id).toBe('number');
      expect(typeof token).toBe('string');
    });
    it('When a user gives the correct information to sign up, the user account is created AND logged in.', async () => {
      const signupInfo = {
        first_name: 'Kacey',
        last_name: 'Musgraves',
        email: 'kacey.musgraves@goldenhour.xyz',
        password: 'SpaceC0wboy',
      };

      const signup_res = await ctx.client.send(signup(signupInfo));

      expect(signup_res?.signup).toBeInstanceOf(Object);
      expect(typeof signup_res.signup.token).toBe('string');
      expect(signup_res.signup.user?.email).toBe(signupInfo.email);
      expect(signup_res.signup.user.first_name).toBe('Kacey');
      expect(signup_res.signup.user.last_name).toBe('Musgraves');
    });
  });

  describe('Incorrect Authentication', () => {
    it('When attempting to signup with a bad password, the sign is rejected', async () => {
      jest.spyOn(console, 'log').mockImplementation(() => {});
      const signupInfo = {
        first_name: 'Billy',
        last_name: 'Smith',
        email: 'twenty.one.pilots@top.top',
        password: 'blurryface',
      };

      await expect(ctx.client.send(signup(signupInfo))).rejects.toBeTruthy();
    });
    /**
     * Test the 'User does not exist' path.
     */
    test('When attempting to login to a nonexistent user, the login is rejected.', async () => {
      jest.spyOn(console, 'log').mockImplementation(() => {});

      const credentials = {
        email: 'kali.uchis@isolation.mp3',
        password: 'Kill3r21123123123',
      };
      await expect(ctx.client.send(login(credentials))).rejects.toBeTruthy();
    });
  });
});
