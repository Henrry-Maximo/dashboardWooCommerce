import React from "react";
import styles from "../../assets/styles/Welcome.module.css";
import Logo from "../../assets/images/icon.png";

const Welcome = () => {
  return (
    <div className={styles.content}>
      <img src={Logo}></img>
      <h1>Bem-vindo ao Painel de Acompanhamentos de Pedidos.</h1>
      <p>
        Aqui você pode visualizar/gerenciar todas as informações importantes do
        Woocommerce.
      </p>
    </div>
  );
};

export default Welcome;
