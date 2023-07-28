const authRoute = require("./authRoute");
const userRoute = require("./userRoutes");

const basePath = "/api/v1";

module.exports = (app) => {
  app.use(`${basePath}/auth`, authRoute);
  app.use(`${basePath}/user`, userRoute);
};
