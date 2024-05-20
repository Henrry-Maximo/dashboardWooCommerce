import React from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/styles/DashboardHeader.module.css"; 

const Header = ({ toggleMenu }) => {
  function handleLogout() {
    sessionStorage.clear();
    window.location.reload(true);
  }

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className="sidebar-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <h1 className={styles.titleHeader}>MOV: DASHBOARD</h1>
        <nav className={styles.optionsNav}>
          <ul className={styles.listNav}>
            <li className={styles.itemNav}>
              <Link to="/" className={styles.linkNav}>
                Início
              </Link>
            </li>
            <li className={styles.itemNav}>
              <Link to="/sobre" className={styles.linkNav}>
                Sobre
              </Link>
            </li>
          </ul>
        </nav>
        <div className="logout-btn-container">
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
