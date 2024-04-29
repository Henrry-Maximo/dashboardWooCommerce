const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function generateToken(id, user) {
  return jwt.sign({ infoUser: { id, user: user } }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
}

module.exports = generateToken;
