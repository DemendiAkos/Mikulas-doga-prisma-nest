import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');
  
  for (let i = 0; i < 10; i++) {
    const kidName = faker.name.firstName();
    const kidAddress = faker.address.streetAddress();
    const kidIsGood = faker.datatype.boolean();

    const kid = await prisma.kid.create({
      data: {
        name: kidName,
        address: kidAddress,
        isGood: kidIsGood,
        toys: {
          create: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(() => ({
            name: faker.commerce.productName(),
            material: faker.helpers.arrayElement(['Wood', 'Metal', 'Plastic', 'Other']),
            weight: faker.number.float({ min: 0.1, max: 10, fractionDigits: 1 }),
          })),
        },
      },
    });

    console.log(`Created kid: ${kid.name}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });