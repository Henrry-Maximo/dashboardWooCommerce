import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";
// import "../../assets/styles/Login.css";
import Logo from "../../assets/images/mov-logo.png";
import Logowork from "../../assets/images/key.svg";
// import Logo from "../../assets/images/noun-login.svg";

const Registation = (request, response) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  async function handleRegistation(e) {
    e.preventDefault();
    const formattedUser = user ? user.toLowerCase() : "";
    const formattedPassword = password ? password.toLowerCase() : "";

    try {
      const dataLogin = {
        username: formattedUser,
        password: formattedPassword,
      };

      await api.post("/registration", dataLogin);

      navigate("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return (
    <div id="container">
      <div id="login-content">
        <div className="login-intro">
          <img src={Logo} alt="Logo da Empresa" className="login-logo" />
          <p>Faça seu registro</p>
        </div>
        <form className="login-form" onSubmit={handleRegistation}>
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
          <div>
            <Link to="/login" className="nav-link" style={{ color: "black" }}>Login</Link>
          </div>
          {
            <div style={{ textAlign: "center" }}>
              <span className="error-message">{error}</span>
            </div>
          }
          <button type="submit" className="btn btn-primary">
            Registrar-se
          </button>
        </form>
      </div>
      <div id="div-content">
        <img src={Logowork} alt="Logo da Empresa" />
      </div>
    </div>
  );
};

export default Registation;
