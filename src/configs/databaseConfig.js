const mongoose = require("mongoose");

// Set mongoose to stricquery to know whether mongoose should enforce a stric schema or not
mongoose.set("strictQuery", false);

// connect to Database
const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL, {})
    .then(() => {
      console.log("DB connection successful!");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Disconnect DB
const disconnectDB = async () => {
  return await mongoose.disconnect();
};

// Export the database connection
module.exports = {
  connectDB,
  disconnectDB,
};
