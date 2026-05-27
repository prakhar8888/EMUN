import pkg from "@prisma/client";

const { PrismaClient } = pkg;

// ======================================
// GLOBAL PRISMA INSTANCE
// ======================================

const globalForPrisma = globalThis;

// ======================================
// PRISMA CLIENT
// ======================================

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

// ======================================
// PREVENT MULTIPLE CLIENTS IN DEV
// ======================================

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ======================================
// EXPORT
// ======================================

export default prisma;
