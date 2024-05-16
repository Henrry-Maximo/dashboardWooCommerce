const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt');


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
    // receber dado do body => obter usuário do banco => fazer comparação
    const user = await login(username);
    
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
      error: `Problema: ${error}`,
    });
  }
});

module.exports = router;
