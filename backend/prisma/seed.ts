import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create tenants
  const acme = await prisma.tenant.create({
    data: {
      slug: "acme",
      name: "Acme Corporation",
      plan: "FREE",
    },
  });

  const globex = await prisma.tenant.create({
    data: {
      slug: "globex",
      name: "Globex Corporation",
      plan: "FREE",
    },
  });

  // Hash password
  const hashedPassword = await bcrypt.hash("password", 10);

  // Create users
  await prisma.user.createMany({
    data: [
      {
        email: "admin@acme.test",
        password: hashedPassword,
        role: "ADMIN",
        tenantId: acme.id,
      },
      {
        email: "user@acme.test",
        password: hashedPassword,
        role: "MEMBER",
        tenantId: acme.id,
      },
      {
        email: "admin@globex.test",
        password: hashedPassword,
        role: "ADMIN",
        tenantId: globex.id,
      },
      {
        email: "user@globex.test",
        password: hashedPassword,
        role: "MEMBER",
        tenantId: globex.id,
      },
    ],
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
