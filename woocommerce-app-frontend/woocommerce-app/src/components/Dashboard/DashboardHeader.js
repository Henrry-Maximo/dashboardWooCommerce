import React, { useEffect, useState } from "react";
import { ptBR } from "date-fns/locale/pt-BR";

import styles from "../../assets/styles/DashboardHeader.module.css";

import mov from "../../assets/images/mov-logo-new.png";
import iconMenu from "../../assets/images/menu-fill.png";
import arrowMenu from "../../assets/images/arrow-logo.gif";

import { format } from "date-fns";
import axios from "axios";

const Header = ({ toggleMenu }) => {
  // horário da máquina
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=-23.638435&lon=-46.822674&units=metric&appid=ce3addfba6e2d71da642ee3f32350756&lang=pt_br`
        );
        const data = response.data;
        setWeather(data);
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    fetchWeather();
  }, []);

  const nowSystemDate = format(currentTime, "dd'/'MM'/'yyyy", {
    locale: ptBR,
  });

  const nowSystemTime = format(currentTime, "HH:mm:ss", {
    locale: ptBR,
  });

  const nowTempFormatterString = weather ? weather.weather[0].description : "Carregando...";
  const nowTempString =
    nowTempFormatterString.charAt(0).toUpperCase() +
    nowTempFormatterString.slice(1).toLowerCase();

  const nowTempTime = weather ? ~~weather.main.temp : "Carregando...";

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
            style={{ height: "50px", transform: "scaleX(-1)" }}
          ></img>
          <img src={mov} alt="mov-logo" style={{ height: "50px" }}></img>
          <img
            src={arrowMenu}
            alt="arrow-logo"
            style={{ height: "50px" }}
          ></img>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "#daaa00",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              fontWeight: "600",
              gap: "2px",
            }}
          >
            {/* <IoTimeOutline /> */}
            {nowSystemTime}
          </p>
          <p style={{ fontSize: "18px", fontWeight: "300" }}>{nowSystemDate}</p>
          {weather && (
            <p style={{ fontSize: "18px", fontWeight: "300" }}>
              {nowTempString}, {nowTempTime} °C
            </p>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
