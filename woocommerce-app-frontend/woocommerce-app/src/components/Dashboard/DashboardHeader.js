import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link se estiver usando react-router
import '../../assets/styles/DashboardHeader.css'; // Importe o arquivo de estilo CSS para estilização

const Header = () => {
    function handleLogout() {
        sessionStorage.clear();
        window.location.reload(true);
    }
    
    return (
        <header className="dashboard-header">
            <div className="header-container">
                <h1 className="logo">MOV: DASHBOARD</h1>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Início</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/sobre" className="nav-link">Sobre</Link>
                        </li>
                    </ul>
                </nav>
                <div className="logout-btn-container">
                    <button className="logout-btn" onClick={handleLogout}>Sair</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
