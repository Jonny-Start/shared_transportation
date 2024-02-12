const bcrypt = require("bcrypt");

const encrypt = async (textPlain) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(textPlain, saltRounds);
  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = { encrypt, compare };
