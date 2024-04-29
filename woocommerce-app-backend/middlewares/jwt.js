const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({
    message:
      'Token não informado.'
  });

  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).send({
    message: 'Token inválido.'
  });

  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ message: 'Token inválido.' });

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Usuário não autenticado.'
      });
    }
    req.infoUser = decoded.infoUser;
    return next();
  });
}

module.exports = verifyJWT;
