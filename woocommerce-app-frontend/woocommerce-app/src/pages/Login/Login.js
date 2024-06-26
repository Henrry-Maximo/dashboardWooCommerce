import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";

import styles from "../../assets/styles/Login.module.css";
import Logo from "../../assets/images/icon.png";
import Logowork from "../../assets/images/password.svg";
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

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerLogin}>
        <div className={styles.headerLogin}>
          <img src={Logo} alt="Logo da Empresa" className={styles.headerLogo} />
          <p>Faça <strong>login</strong> em sua conta</p>
        </div>
        <form onSubmit={handleLogin} className={styles.formBody}>
          <div className={styles.spaceInput}>
            <div className={styles.formLogin}>
              <label htmlFor="username">Usuário:</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="Digite seu usuário"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className={styles.formLogin}>
              <label htmlFor="password">Senha:</label>
              <input
                type="password"
                className={styles.formControl}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formLink}>
            <Link
              to="/registration"
              className={styles.linkRegistration}
              style={{ color: "black" }}
            >
              Registre-se
            </Link>
          </div>
          {
            <div style={{ textAlign: "center" }}>
              <span className={styles.messageError}>{error}</span>
            </div>
          }
          <button type="submit" className={styles.buttonLogin}>
            Entrar
          </button>
        </form>
      </div>
      <div className={styles.formBackground}>
        <img src={Logowork} alt="Logo da Empresa" />
      </div>
    </div>
  );
};

export default Login;
