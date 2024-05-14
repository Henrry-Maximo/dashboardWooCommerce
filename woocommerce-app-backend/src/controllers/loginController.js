const express = require("express");
const { validationResult } = require("express-validator");

const login = require("../services/loginService.js");
const generateToken = require("../../helpers/userfeatures.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

  // Validar entrada de dados
  if (!username || !password) {
    return res.status(401).send({ message: "Usuário ou senha está faltando." });
  }

  try {
    const isValidCredentials = await login(username, password);

    if (isValidCredentials.length > 0) {
      const { id_user, name_user } = isValidCredentials[0];
      const token = generateToken(id_user, name_user);

      res.status(200).send({ message: "Login efetuado com sucesso.", token });
    } else {
      res.status(401).send({ message: "Usuário ou senha incorretos." });
    }
  } catch (error) {
    res.status(500).send({
      message: `Ocorreu um erro no login. Por favor, contate um administrador.`,
      error: `Problema: ${error}`
    });
  }
});

module.exports = router;
