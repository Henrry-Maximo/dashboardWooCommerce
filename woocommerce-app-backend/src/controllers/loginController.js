const express = require("express");
const login = require("../services/loginService.js");
const generateToken = require("../../helpers/userfeatures.js");

const router = express.Router();

router.post("/", async (request, response) => {
    const { user, password } = request.body;
    
    try {
        const results = await login(user, password);

        if (results.length > 0) {
            const { id, user } = results[0];
            const token = generateToken(id, user);

            response.status(200).send({ message: "Login efetuado com sucesso.", token});
        } else {
            response.status(401).send({ message: "Login ou senha inválidos." });
        }
    } catch (error) {
        response.status(500).send({ message: `Encontramos um Erro: ${error}` });
    }
}
);

module.exports = router;
