import React from "react";
import "../../assets/styles/Error.css";

import { FaExclamationCircle } from "react-icons/fa";

const Error = () => {
  return (
    <div id="container">
        <div id="error">
          <span><FaExclamationCircle />404 - Página Não Encontrada.</span>
          <a href="/">Por favor, retorne para a home.</a>
        </div>
    </div>
  );
};

export default Error;
