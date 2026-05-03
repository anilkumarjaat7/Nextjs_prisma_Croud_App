import { PrismaClient } from "@prisma/client";

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Using Prisma Accelerate for connection pooling
    accelerateUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
