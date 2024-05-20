import React from 'react';
import styles from '../../assets/styles/About.module.css';
import Logo from "../../assets/images/icon.png";

function About() {
    return (
        <div className={styles.wrapperAbout}>
            <h2>Sistema de Visualização de Pedidos</h2>
            <p className={styles.titleAbout}>O Sistema de Visualização de Pedidos é uma ferramenta desenvolvida pela MOV para facilitar o gerenciamento e acompanhamento de pedidos feitos através da plataforma WooCommerce.</p>
            <p >Com esta aplicação, os usuários podem acompanhar o status dos pedidos, visualizar detalhes dos produtos comprados, gerar relatórios e muito mais.</p>
            <img src={Logo} alt='Logo da Mov'></img>
            <p>Desenvolvido por <a href='https://github.com/Henrry-Maximo' target='_blank'>@Henrique_Maximo</a>, 2024</p>
        </div>
    );
}

export default About;
