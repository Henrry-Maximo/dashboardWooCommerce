const express = require("express");

const { body, validationResult } = require("express-validator");
const { Database } = require("../services/userService.js");
const { hash } = require("bcrypt");

const db = new Database();
const router = express.Router();

router.post(
  "/user",
  [
    body("username").isString().withMessage("Usuário não pode ter número"),
    body("password")
      .isLength({ min: 7, max: 12 })
      .withMessage("A senha deve conter entre 7 e 12 caracteres"),
  ],
  async (req, res) => {
    const { username, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (password.length < 10) {
     res.status(400).json({message: 'Senha deve ter pelo menos 10 caracteres'})
    }

    try {
      const passwordHash = await hash(password, 10); 

      await db.insertUser({ name: username, password: passwordHash });
      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (err) {
      res.status(500).json({ message: `Encontramos um erro: ${err}` });
    }
  }
);

router.get("/", async (req, res) => {
  // try... catch - checar se há erros
  try {
    const results = await db.findUser();

    //console.log(results)
    //!results.length==0
    //!! - verificação do tipo
    if (results.length == 0) {
      res.status(204).end();
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).json({ message: `Encontramos um erro: ${err}` });
  }
});

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
