const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const client1 = await prisma.client.create({
    data: {
      name: "Laís Cohn",
      address: "Avenida Brasil, 2340 - Centro",
      code: 2324,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: "Enzo Leal",
      address: "General João Marcelino, 156/201 - Santa Helena",
      code: 2991,
    },
  });

  console.log({ client1, client2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
