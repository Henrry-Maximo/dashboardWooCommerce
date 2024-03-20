import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import "../../assets/styles/Login.css";
import Logo from "../../assets/images/mov-logo.png";
// import Logo from "../../assets/images/noun-login.svg";

const Login = (request, response) => {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const dataLogin = {
                user,
                password
            }

            const { data } = await api.post("/login", dataLogin);

            // alert("Login efetuado com sucesso!");

            sessionStorage.setItem("login", true);
            sessionStorage.setItem("jwt", data.token);

            navigate("/");
        } catch (error) {
            setError(error.response.data.message);;
        }
    }

    return (
        <div id="login-container">
            <div id="login-content">
                <img src={Logo} alt="Logo da Empresa" className="login-logo" />
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Usuário:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Digite seu Usuário"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Digite sua Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <span className="error-message">{error}</span>}
                    <button type="submit" className="btn btn-primary" onClick={handleLogin}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
