import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardHeader from "../../components/Dashboard/DashboardHeader.js";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar.js";
import DashboardFooter from "../../components/Dashboard/DashboardFooter.js";
import DashboardCenter from "../../components/Dashboard/DashboardCenter.js";

import Welcome from "./Welcome.js";
import About from "./About.js";

import styles from "../../assets/styles/Home.module.css";

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
        <DashboardSidebar
          style={{ width: "256px" }}
          menuOpen={menuOpen}
          closeMenu={() => setMenuOpen(false)}
        />
        {pathname === "/" || pathname === "/sobre" ? (
          <div style={{ flex: "1", padding: "0px 5px", overflow: "auto" }}>
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
      <DashboardFooter style={{ background: "red" }} />
    </div>
  );
};

export default Home;
