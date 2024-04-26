import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import DashboardHeader from "../../components/Dashboard/DashboardHeader.js";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar.js";
import DashboardFooter from "../../components/Dashboard/DashboardFooter.js";
import DashboardCenter from "../../components/Dashboard/DashboardCenter.js";

// import styles from "../../assets/styles/Home.css";
import Welcome from './Welcome.js';
import About from './About.js';

const Home = () => {
  const location = useLocation();
  const { pathname } = location;

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
      setMenuOpen(!menuOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <DashboardHeader toggleMenu={toggleMenu} menuOpen={menuOpen} />
      <div style={{ display: "flex", flex: "1" }}>
        <DashboardSidebar style={{ width: "256px" }} menuOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
        <div style={{ flex: "1", padding: "0px 5px" }}>
          {pathname === "/" && <Welcome />}
          {pathname === "/dashboard" && <DashboardCenter  />}
          {pathname === "/sobre" && <About />}
        </div>
      </div>
      <DashboardFooter style={{background: "red"}} />
    </div>
  );
};

export default Home;
