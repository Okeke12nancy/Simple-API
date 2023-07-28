const express = require("express");
const cors = require("cors");
const appRoutes = require("./routes/app.routes");

const app = express();
// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

require("dotenv").config();

appRoutes(app);

module.exports = app;
