import React, { useState } from "react";
import { Link } from "react-router-dom"; // Importe o Link se estiver usando react-router
import "../../assets/styles/DashboardSidebar.css";

const DashboardSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <aside className={`sidebar ${menuOpen ? "" : "open"}`}>
      <nav className="sidebar-nav">
        <div className="sidebar-toggle" onClick={toggleMenu}>
          MENU ☰
        </div>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/dashboard" className="sidebar-link" onClick={closeMenu}>
              Dashboard de Pedidos
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/perfil" className="sidebar-link" onClick={closeMenu}>
              Dashboard de Transporte
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/configuracoes" className="sidebar-link" onClick={closeMenu}>
              Configurações
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
