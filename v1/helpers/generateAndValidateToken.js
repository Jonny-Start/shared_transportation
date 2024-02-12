const jwt = require("jsonwebtoken");
require("dotenv").config();

const tokenSing = async (dataUser) => {
  return jwt.sign(
    {
      _id: dataUser._id,
      name: dataUser.name,
      role: dataUser.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "2h",
    }
  );
};

const verifyToken = async (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (error, data) => {
    if (error) {
      return error.message;
    }
    return data;
  });
};

module.exports = { tokenSing, verifyToken };
