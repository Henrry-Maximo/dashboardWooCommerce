import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../services/api.js";

import styles from "../../assets/styles/Registration.module.css";
import Logo from "../../assets/images/icon.png";
import Logowork from "../../assets/images/noun-login.svg";
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.headerLogin}>
          <img src={Logo} alt="Logo da Empresa" className={styles.headerLogo} />
          <p>Faça o <strong>registro</strong> da sua conta</p>
        </div>
        <form className={styles.formBody} onSubmit={handleRegistation}>
          <div className={styles.spaceInput}>
            <div className={styles.formLogin}>
              <label htmlFor="username">Usuário:</label>
              <input
                type="text"
                className={styles.formControl}
                placeholder="..."
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
                placeholder="..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className={styles.formLink}>
            <Link to="/login" className={styles.linkRegistration} style={{ color: "black" }}>
              Login
            </Link>
          </div>
          {
            <div style={{ textAlign: "center" }}>
              <span className={styles.messageError}>{error}</span>
            </div>
          }
          <button type="submit" className={styles.buttonLogin}>
            Registrar-se
          </button>
        </form>
      </div>
      <div className={styles.formBackground}>
        <img src={Logowork} alt="Logo da Empresa" />
      </div>
    </div>
  );
};

export default Registation;
