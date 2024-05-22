import React from "react";
import { Link } from "react-router-dom";

import styles from "../../assets/styles/DashboardSidebar.module.css";

import { FaDisplay } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";

const DashboardSidebar = ({ menuOpen, closeMenu }) => {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navSidebar}>
        <ul className={styles.listSidebar}>
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
            <Link
              to="/perfil"
              className={styles.linkSidebar}
              onClick={closeMenu}
            >
              <FaDisplay className={styles.icon} />
              Dashboard de Transporte
            </Link>
          </li>
          <li className={styles.itemSidebar}>
            <Link
              to="/configuracoes"
              className={styles.linkSidebar}
              onClick={closeMenu}
            >
              <GrConfigure className={styles.icon} />
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
