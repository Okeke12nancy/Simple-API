const express = require("express");
const app = require("./app.js");
const logger = require("./configs/logger.config");
const { connectDB, disconnectDB } = require("./configs/databaseConfig");

async function startServer() {
  try {
    await connectDB();
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }

  app
    .listen(process.env.PORT, () => {
      console.log(`
      ################################################
      🪐  Server listening on port: ${process.env.PORT} 🪐
      ################################################
    `);
      logger.info(`Server started`);
    })
    .on("error", async (err) => {
      logger.error(err);
      await disconnectDB();
      process.exit(1);
    });
}

startServer()
  .then(() => {
    console.log("Server started...");
  })
  .catch((err) => {
    console.log(err);
  });

process.on("unhandledRejection", (reason, p) => {
  console.log(p, reason);
  logger.error("Unhandled Rejection at: Promise ", p, reason);
  // application specific logging, throwing an error, or other logic here
});
