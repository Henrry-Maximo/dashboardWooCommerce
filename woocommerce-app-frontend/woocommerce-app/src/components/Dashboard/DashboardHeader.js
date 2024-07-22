import React, { useEffect, useState } from "react";
import styles from "../../assets/styles/DashboardHeader.module.css";
import mov from "../../assets/images/mov-logo-new.png";
import iconMenu from "../../assets/images/menu-fill.png";
import arrowMenu from "../../assets/images/arrow-logo.gif";

const Header = ({ toggleMenu }) => {
  // horário da máquina
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sidebarToggle} onClick={toggleMenu}>
          <img
            src={iconMenu}
            alt="icon-menu"
            style={{ height: "1.10rem" }}
          ></img>
        </div>
        <div>
          <img
            src={arrowMenu}
            alt="arrow-logo"
            style={{ height: "50px", transform: "scaleX(-1)"
            }}
          ></img>
          <img src={mov} alt="mov-logo" style={{ height: "50px" }}></img>
          <img
            src={arrowMenu}
            alt="arrow-logo"
            style={{ height: "50px" }}
          ></img>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#daaa00" }}>
          <p style={{ fontSize: "28px" }}>{formattedTime}</p>
          <p style={{ fontSize: "18px" }}>{formattedDate}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
