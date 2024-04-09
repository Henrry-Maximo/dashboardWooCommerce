import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/DashboardHeader.css"; 

const Header = ({ toggleMenu }) => {
  function handleLogout() {
    sessionStorage.clear();
    window.location.reload(true);
  }

  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="sidebar-toggle" onClick={toggleMenu}>
          ☰
        </div>
        <h1 className="logo">MOV: DASHBOARD</h1>
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Início
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sobre" className="nav-link">
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
