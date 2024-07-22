import React from "react";
// import { Link } from "react-router-dom";
import styles from "../../assets/styles/DashboardHeader.module.css"; 

const Header = ({ toggleMenu, closeMenu, handleLogout }) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sidebarToggle} onClick={toggleMenu}>
          ☰
        </div>
        <h1 className={styles.titleHeader}>MOV DASHBOARD</h1>
        {/* <nav className={styles.optionsNav}>
          <ul className={styles.listNav}>
            <li className={styles.itemNav}>
              <Link to="/" className={styles.linkNav} onClick={closeMenu}>
                Início
              </Link>
            </li>
            <li className={styles.itemNav}>
              <Link to="/sobre" className={styles.linkNav} onClick={closeMenu}>
                Sobre
              </Link>
            </li>
          </ul>
        </nav> */}
        <div className={styles.boxBtn}>
          <button className={styles.handleLogout} onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
