/** @format */

import { PrismaClient } from "@prisma/client"; // import your Prisma Client instance
const prisma = new PrismaClient();
async function main() {
  try {
    await prisma.$connect(); // try to connect to the database
    console.log("Connected to Prisma");
  } catch (error) {
    console.error("Failed to connect to Prisma:", error);
  }
}

export default main;
