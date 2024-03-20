import React from 'react';
import '../../assets/styles/About.css';
import Logo from "../../assets/images/icon.png";

function About() {
    return (
        <div className="about-container">
            <h2 style={{ color: "#333", padding: "10px" }}>Sistema de Visualização de Pedidos</h2>
            <p style={{ margin: "10px" }}>O Sistema de Visualização de Pedidos é uma ferramenta desenvolvida pela MOV para facilitar o gerenciamento e acompanhamento de pedidos feitos através da plataforma WooCommerce.</p>
            <p >Com esta aplicação, os usuários podem acompanhar o status dos pedidos, visualizar detalhes dos produtos comprados, gerar relatórios e muito mais.</p>
            <img src={Logo} style={{ maxWidth: "110px", margin: "40px" }}></img>
            <p>Desenvolvido por <a href='https://github.com/Henrry-Maximo' target='_blank'>@Henrique_Maximo</a>, 2024</p>
        </div>
    );
}

export default About;
