import React from 'react';
import "../../assets/styles/Welcome.css";
import Logo from "../../assets/images/icon.png";

const Welcome = () => {
    return (
        <div className="main-content">
            <img src={Logo} style={{ maxWidth: "110px", margin: "40px" }}></img>
            <h1 className="content-h1">Bem-vindo ao Painel de Acompanhamentos de Pedidos.</h1>
            <p className="content-p">
                Aqui você pode visualizar/gerenciar todas as informações
                importantes do Woocommerce.
            </p>
        </div >
    );
}

export default Welcome;