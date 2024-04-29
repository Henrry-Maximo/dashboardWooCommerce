import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";
import "../../assets/styles/Login.css";
import Logo from "../../assets/images/mov-logo.png";
import Logowork from "../../assets/images/key.svg";
// import Logo from "../../assets/images/noun-login.svg";

const Login = (request, response) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const formattedUser = user ? user.toLowerCase() : ""; 
    const formattedPassword = password ? password.toLowerCase() : "";

    try {
      const dataLogin = {
        username: formattedUser,
        password: formattedPassword,
      };

      const { data } = await api.post("/login", dataLogin);

      sessionStorage.setItem("login", true);
      sessionStorage.setItem("jwt", data.token);

      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div id="container">
      <div id="login-content">
        <div className="login-intro">
          <img src={Logo} alt="Logo da Empresa" className="login-logo" />
          <p>Faça login em sua conta</p>
        </div>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Digite seu usuário"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <span className="error-message">{error}</span>}
          <button type="submit" className="btn btn-primary">
            Entrar
          </button>
        </form>
      </div>
      <div id="div-content">
        <img src={Logowork} alt="Logo da Empresa" />
      </div>
    </div>
  );
};

export default Login;
