const express = require("express");
const login = require("../services/loginService.js");
const generateToken = require("../../helpers/userfeatures.js");

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    // verificar senha
    if (!username && !password) {
        return res.writeHead(400).end(JSON.stringify({ message: "usuário e senha são obrigatórios." }))
    }
    
    try {
        const results = await login(username, password);

        if (results.length > 0) {
            const { id_user, name_user } = results[0];
            const token = generateToken(id_user, name_user);

            res.status(200).send({ message: "Login efetuado com sucesso.", token});
        } else {
            res.status(401).send({ message: "Login ou senha inválidos." });
        }
    } catch (error) {
        res.status(500).send({ message: `Encontramos um Erro: ${error}` });
    }
}
);

module.exports = router;
