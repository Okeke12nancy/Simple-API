const jwt = require("jsonwebtoken");
const addMinutes = require("../helpers/date");

const generateJwtToken = async function (data, expiry = 720 * 4) {
  const exp = addMinutes(new Date(), expiry);

  return jwt.sign(
    {
      data,
      exp: exp.getTime() / 1000,
    },
    process.env.JWT_SECRET
  );
};

const tokenVerifier = async (authToken) => {
  return jwt.verify(authToken, process.env.JWT_SECRET);
};

module.exports = {
  generateJwtToken,
  tokenVerifier,
};
