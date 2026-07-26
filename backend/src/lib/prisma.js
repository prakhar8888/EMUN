import pkg from "@prisma/client";

const { PrismaClient } = pkg;

// ======================================
// GLOBAL PRISMA INSTANCE
// ======================================

const globalForPrisma = globalThis;

// ======================================
// RETRY CONFIG
// ======================================
// Neon's free-tier database automatically suspends its compute after
// a period of inactivity. The first query after a suspension can fail
// with Prisma error code P1017 ("Server has closed the connection"),
// even though Neon has already woken the database back up by the time
// a retry lands. This client extension catches exactly that error and
// retries the same query once, after a short delay, before giving up.

const RETRYABLE_ERROR_CODES = ["P1017", "P1001", "P1008"];

const isRetryableError = (error) =>
  RETRYABLE_ERROR_CODES.includes(error?.code) ||
  /terminating connection due to administrator command/i.test(
    error?.message || ""
  );

// ======================================
// BASE PRISMA CLIENT
// ======================================

const basePrisma =
  globalForPrisma.prismaBase ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : ["error"],
  });

// ======================================
// EXTENDED CLIENT WITH AUTO-RETRY
// ======================================

const prisma = basePrisma.$extends({
  query: {
    async $allOperations({ model, operation, args, query }) {
      try {
        return await query(args);
      } catch (error) {
        if (!isRetryableError(error)) {
          throw error;
        }

        console.warn(
          `[Prisma Retry] ${model}.${operation} failed due to a dropped connection. Retrying once...`
        );

        // Brief delay to give Neon's compute a moment to fully wake up
        await new Promise((resolve) => setTimeout(resolve, 500));

        return query(args);
      }
    },
  },
});

// ======================================
// PREVENT MULTIPLE CLIENTS IN DEV
// ======================================

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaBase = basePrisma;
}

// ======================================
// EXPORT
// ======================================

export default prisma;
