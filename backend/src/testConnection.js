import dotenv from "dotenv";
dotenv.config();

import prisma from "./lib/prisma.js";

// ======================================
// DATABASE CONNECTION TEST
// ======================================
const testDB = async () => {
  try {
    await prisma.$connect();

    console.log(
      "✅ Database Connected Successfully 🚀"
    );

    const result =
      await prisma.$queryRaw`SELECT NOW()`;

    console.log(
      "📦 Database Time:",
      result
    );
  } catch (error) {
    console.error(
      "❌ Database Connection Failed"
    );

    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};

testDB();
