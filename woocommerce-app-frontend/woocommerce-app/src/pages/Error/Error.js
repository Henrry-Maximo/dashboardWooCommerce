import React from "react";
import styles from "../../assets/styles/Error.module.css";

import { FaExclamationCircle } from "react-icons/fa";

const Error = () => {
  return (
    <div className={styles.container}>
        <div className={styles.error}>
          <span><FaExclamationCircle />404 - Página Não Encontrada.</span>
          <a href="/">Por favor, retorne para a home.</a>
        </div>
    </div>
  );
};

export default Error;
