import React from "react";
import "../../assets/styles/Error.css";
import { MDBIcon } from "mdb-react-ui-kit";

const Error = () => {
  return (
    <div id="container-error">
    <div className="content-error">
      <p>
        <MDBIcon fas icon="exclamation-circle" />
        404 - Página Não Encontrada.
        <a href="/">Por favor, retorne para a home.</a>
      </p>
    </div>
    </div>
  );
};

export default Error;
