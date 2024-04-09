import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/DashboardSidebar.css";

// icons
import { FaDisplay } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { GrConfigure } from "react-icons/gr";


const DashboardSidebar = ({ menuOpen, closeMenu }) => {
  console.log(`teste: ${menuOpen}`);
  return (
    <aside className={`sidebar ${menuOpen ? "" : "open"}`}>
      <nav className="sidebar-nav">
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link" onClick={closeMenu}>
            <FaBox id="sidebar-img" />
              Dashboard de Pedidos
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/perfil" className="sidebar-link" onClick={closeMenu}>
            <FaDisplay id="sidebar-img" />
              Dashboard de Transporte
            </Link>
          </li>
          <li className="sidebar-item">
            <Link
              to="/configuracoes"
              className="sidebar-link"
              onClick={closeMenu}
            >
              <GrConfigure id="sidebar-img" />
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
