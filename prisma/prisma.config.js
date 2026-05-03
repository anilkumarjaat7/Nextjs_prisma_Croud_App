/** @type {import("@prisma/sdk").Config} */
const config = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

module.exports = config;
