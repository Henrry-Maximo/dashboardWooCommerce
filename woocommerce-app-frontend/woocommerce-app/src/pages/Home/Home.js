import React from "react";
import { useLocation } from 'react-router-dom';
import DashboardHeader from "../../components/Dashboard/DashboardHeader.js";
import DashboardSidebar from "../../components/Dashboard/DashboardSidebar.js";
import DashboardFooter from "../../components/Dashboard/DashboardFooter.js";
import DashboardCenter from "../../components/Dashboard/DashboardCenter.js";

// import "../../assets/styles/Home.css";
import Welcome from './Welcome.js';
import About from './About.js';

const Home = () => {
  const location = useLocation();
  const { pathname } = location;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <DashboardHeader />
      <div style={{ display: "flex", flex: "1" }}>
        <DashboardSidebar style={{ width: "256px" }}/>
        <div style={{ flex: "1", padding: "0px 5px" }}>
          {pathname === "/" && <Welcome />} {/* Renderize Welcome apenas para /dashboard */}
          {pathname === "/dashboard" && <DashboardCenter />} {/* Renderize Dashboard apenas para /dashboard */}
          {pathname === "/sobre" && <About />}
        </div>
      </div>
      <DashboardFooter style={{background: "red"}} />
    </div>
  );
};

export default Home;
