const express = require("express");

const { body, validationResult } = require("express-validator");
const { Database } = require("../services/userService.js");
const { hash } = require("bcrypt");
const { randomInt } = require("crypto");

const db = new Database();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const results = await db.findUser();

    if (results.length == 0) {
      res.status(204).end();
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).json({ message: `Encontramos um erro: ${err}` });
  }
});

router.post(
  "/",
  [
    body("username").notEmpty().withMessage("Usuário não pode ser vazio."),
    body("password").isLength({ min: 7, max: 12 }).withMessage("A senha deve conter entre 7 e 12 caracteres."),
  ],
  async (req, res) => {
    const { username, password } = req.body;
    

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = errors.array(); 
      return res.status(401).send({ message: error[0].msg });
    }

    try {
      // Verificar se o usuário já existe
      const userExists = await db.userExists(username);
      if (userExists) {
        return res.status(400).json({ message: "Usuário já existe." });
      }

      // sortear um número entre 10 e 16
      const randomSalt = randomInt(10, 16);
      const passwordHash = await hash(password, randomSalt);

      await db.insertUser({ name: username, password: passwordHash });
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      res.status(400).json({ err: `Falha no registro!` });
    }
  }
);

router.put(
  "/",
  [
    body("name").isString().withMessage("Usuário não pode ter número"),
    body("password")
      .isLength({ min: 7, max: 12 })
      .withMessage("A senha deve conter entre 7 e 12 caracteres"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, password, idUser } = req.body;

    try {
      await db.updateUser(name, password, idUser);
      res.status(200).json({ message: "Usuario atualizado com sucesso." });
    } catch (err) {
      res.status(500).json({
        message: `Houve um erro ao atualizar.
    Erro: ${err}`,
      });
    }
  }
);

router.delete("/:idUser", async (req, res) => {
  const { idUser } = req.params;
  try {
    db.deleteUser(idUser);
    res.status(200).json({ message: "Item excluido com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: `Houve um erro: ${err}` });
  }
});

// Restfull api = { "idUser": 1} / http://localhost:3333/user/2

module.exports = router;
