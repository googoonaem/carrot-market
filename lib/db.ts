import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // const user = await db.user.create({
  //   data: {
  //     username: '김타코',
  //   },
  // });

  const smsToken = await db.sMSToken.findUnique({
    where: {
      id: 2,
    },
    include: {
      user: true,
    },
  });

  console.log(smsToken);
}
main();
export default db;
