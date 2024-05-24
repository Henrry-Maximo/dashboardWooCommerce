import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardHeader from "../../components/Dashboard/DashboardHeader.js";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar.js";
import DashboardFooter from "../../components/Dashboard/DashboardFooter.js";
import DashboardCenter from "../../components/Dashboard/DashboardCenter.js";

import Welcome from "./Welcome.js";
import About from "./About.js";

// import styles from "../../assets/styles/Home.module.css";

const Home = () => {
  const location = useLocation();
  const { pathname } = location;

  // Hook useState para gerenciar o estado do menu (aberto/fechado)
  const [menuOpen, setMenuOpen] = useState(true);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    console.log(!menuOpen);
    setMenuOpen(!menuOpen);
  };

  // deslogar usuário (botão sair do header)
  function handleLogout() {
    sessionStorage.clear();
    window.location.reload(true);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <DashboardHeader toggleMenu={toggleMenu} closeMenu={() => setMenuOpen(true)} handleLogout={handleLogout} />
      <div style={{ display: "flex", flex: "1" }}>
        <DashboardSidebar
          menuOpen={menuOpen}
          closeMenu={() => setMenuOpen(true)}
        />
        {pathname === "/" || pathname === "/sobre" ? (
          <div
            style={{
              display: "flex",
              flex: "1",
              padding: "0px 5px",
              overflow: "auto",
              alignItems: "center",
            }}
          >
            {pathname === "/" && <Welcome />}
            {pathname === "/sobre" && <About />}
          </div>
        ) : null}

        {pathname === "/dashboard" ? (
          <div style={{ height: "100%", width: "100%", overflow: "auto" }}>
            {pathname === "/dashboard" && <DashboardCenter />}
          </div>
        ) : null}
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Home;
