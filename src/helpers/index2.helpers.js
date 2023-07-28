const bcrypt = require("bcryptjs");

//hash
const hash = async function (param) {
  return await bcrypt.hash(param, 12);
};

//verify hash
const verifyHash = async function (hashedPram, param) {
  return await bcrypt.compare(param, hashedPram);
};

module.exports = {
  hash,
  verifyHash,
};
