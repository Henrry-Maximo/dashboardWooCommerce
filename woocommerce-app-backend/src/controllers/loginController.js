const express = require("express");
const { validationResult, body } = require("express-validator");
const bcrypt = require("bcrypt");

const login = require("../services/loginService.js");
const generateToken = require("../../helpers/userfeatures.js");

const router = express.Router();

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Usuário é obrigatório!"),
    body("password").notEmpty().withMessage("Senha é obrigatória!"),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array();
      return response.status(400).json({ message: error[0].msg });
    }

    try {
      // obter usuário do banco
      const user = await login(username);
      if (!user || user.length === 0) {
        return res
          .status(401)
          .send({ message: "Usuário ou senha incorretos." });
      }

      // comparar a senha fornecida com a senha armazenada
      const isValidPassword = await bcrypt.compare(password, user[0].password);
      if (isValidPassword) {
        const { id_user, name_user } = user[0];
        const token = generateToken(id_user, name_user);
        res.status(200).send({ message: "Login efetuado com sucesso.", token });
      } else {
        res.status(401).send({ message: "Usuário ou senha incorretos." });
      }
    } catch (error) {
      res.status(500).send({
        message: `Ocorreu um erro no login. Por favor, contate um administrador.`,
      });
    }
  }
);

module.exports = router;
