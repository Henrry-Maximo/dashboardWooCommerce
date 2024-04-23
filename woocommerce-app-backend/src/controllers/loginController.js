const express = require("express");
const login = require("../services/loginService.js");
const generateToken = require("../../helpers/userfeatures.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Validar entrada de dados
  if (!username || !password) {
    return res.status(401).send({ message: "Credenciais inválidas." });
  }

  try {
    const isValidCredentials = await login(username, password);

    if (!isValidCredentials){
        return res.status(401).send({ messsage: "Usuário não existe." })
    }

    if (isValidCredentials.length > 0) {
      const { id_user, name_user } = isValidCredentials[0];
      const token = generateToken(id_user, name_user);

      res.status(200).send({ message: "Login efetuado com sucesso.", token });
    } else {
      res.status(401).send({ message: "Login ou senha inválidos." });
    }
  } catch (error) {
    res.status(500).send({
      message: `Ocorreu um erro no login. Por favor, contate um administrador.`,
      error: `Problema: ${error}`
    });
  }
});

module.exports = router;
