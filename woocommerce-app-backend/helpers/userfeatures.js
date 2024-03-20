const jwt = require("jsonwebtoken");

const secret = "movpedidosdashboard";

function generateToken(id, user) {
    return jwt.sign({ infoUser: { id, user: user }}, secret, {
        expiresIn: 60 * 60 * 5,
    });
}

module.exports = generateToken;
