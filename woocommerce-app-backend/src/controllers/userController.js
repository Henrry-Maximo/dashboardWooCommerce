import express, { response } from "express";
import db from "../services/userService.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post(
  "/user",
  //[
  //  body("email").isEmail().withMessage("Informe um email valido"),
  //  body("password")
  //    .isLength({ min: 7, max: 12 })
  //    .withMessage("A senha deve conter entre 7 e 12 caracteres"),
  //],
  async (request, response) => {
    //const email = request.body.email;
    //const password = request.body.password;
    //const userName = request.body.userName;
    const { usuario, email, password } = request.body;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }

    //if(password.length < 10) {
    //  response.status(400).json({message: 'Senha deve ter pelo menos 10 caracteres'})
    //}

    try {
      await db.insertUser(usuario, email, password);
      response.status(201).json({ message: "Usuário cadastrado com sucesso!" });

      //console.log(email, password, userName);
    } catch (err) {
      response.status(500).json({ message: `Encontramos um erro: ${err}` });
    }
  }
);

router.get("/", async (request, response) => {
  // try... catch - checar se há erros
  try {
    const results = await db.findUser();

    //console.log(results)
    //!results.length==0
    //!! - verificação do tipo
    if (results.length == 0) {
      response.status(204).end();
    } else {
      response.status(200).json(results);
    }
  } catch (err) {
    response.status(500).json({ message: `Encontramos um erro: ${err}` });
  }
});

router.put('/', [
  body("email").isEmail().withMessage("Informe um email valido"),
  body("password").isLength({ min: 7, max: 12 }).withMessage("A senha deve conter entre 7 e 12 caracteres"),
], async (request, response) => {
  
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  const {email, password, userName, idUser} = request.body;

  try {
    await db.updateUser(email, password, userName, idUser);
    response.status(200).json({message: 'Usuario atualizado com sucesso.'});
  } catch(err) {
    response.status(500).json({message: `Houve um erro ao atualizar.
    Erro: ${err}`});
  }
});

router.delete('/:idUser', async(request, response) => {
  const {idUser} = request.params;
  try {
  db.deleteUser(idUser);
  response.status(200).json({ message: 'Item excluido com sucesso!' })
  } catch (err) {
    response.status(500).json({ message: `Houve um erro: ${err}`});
  }
});

// Restfull api = { "idUser": 1} / http://localhost:3333/user/2

export default router;
