const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

function generateToken(id, user) {
    return jwt.sign({ infoUser: { id, user: user }}, secret, {
        expiresIn: (60 * 60 * 5) * 7,
    });
}

module.exports = generateToken;
