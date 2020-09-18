import { PrismaClient } from '@prisma/client';
import { initial_users } from './data';
import { hashSync } from 'bcryptjs';

const client = new PrismaClient();

export async function main() {
  await Promise.all(
    initial_users.map(async (user) => {
      await client.user.create({
        data: {
          ...user,
          password: hashSync(user.password!, 10),
        },
      });
    })
  );
  console.log(`created users:`);
  console.table(initial_users);
  await client.$disconnect();
}
main()
  .catch((e) => console.error(e))
  .finally(async () => {});
