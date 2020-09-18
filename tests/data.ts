import { UserCreateInput } from '@prisma/client';
//initial data
export const initial_users: UserCreateInput[] = [
  {
    email: 'mary@ippsec.io',
    password: 'PassWord123',
    first_name: 'Mary',
    last_name: 'Macintosh',
  },
  {
    email: 'blonded@blonded.co',
    password: '\0#%@^#%^@%#%&!&\n👁@^#%<<<!! ;"DROP TABLE CASCADE users; *!^@%#&!@%#^!@\u{1f441}123Aa',
    first_name: 'Frank',
    last_name: 'Ocean',
  },
  {
    email: 'test@test.test',
    password: 'Testing1',
    first_name: 'Fname',
    last_name: 'Lname',
  },
  {
    email: 'default@example.com',
    password: 'Password123!',
    first_name: 'Michael',
    last_name: 'Gardner',
    type: 'admin',
  },
];
