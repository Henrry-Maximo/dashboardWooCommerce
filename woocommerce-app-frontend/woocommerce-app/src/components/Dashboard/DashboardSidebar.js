import React from "react";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/DashboardSidebar.module.css";

import { IoHomeOutline } from "react-icons/io5";
import { FaDisplay } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";
import { FaExclamationCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";

const DashboardSidebar = ({ menuOpen, closeMenu, handleLogout }) => {
  return (
    <aside className={`${styles.sidebar} ${menuOpen ? styles.open : ""}`}>
      <nav className={styles.navSidebar}>
        <ul className={styles.listSidebar}>
          <li className={styles.itemSidebar}>
            <Link to="/" className={styles.linkSidebar} onClick={closeMenu}>
              <IoHomeOutline />
              Início
            </Link>
          </li>
          <li className={styles.itemSidebar}>
            <Link
              to="/dashboard"
              className={styles.linkSidebar}
              onClick={closeMenu}
            >
              <FaBox className={styles.icon} />
              Dashboard de Pedidos
            </Link>
          </li>
          <li className={styles.itemSidebar}>
            <Link to="/perfil" className={styles.linkSidebar}>
              <FaDisplay className={styles.icon} />
              Dashboard de Transporte
            </Link>
          </li>
          <li className={styles.itemSidebar}>
            <Link to="/configuracoes" className={styles.linkSidebar}>
              <GrConfigure className={styles.icon} />
              Configurações
            </Link>
          </li>
          <li className={styles.itemSidebar}>
            <Link
              to="/sobre"
              className={styles.linkSidebar}
              onClick={closeMenu}
            >
              <FaExclamationCircle />
              Sobre
            </Link>
          </li>
          <li className={styles.itemSidebar}>
            <Link
              className={styles.linkSidebar}
              onClick={handleLogout}
            >
              <MdLogout />
              Sair
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
