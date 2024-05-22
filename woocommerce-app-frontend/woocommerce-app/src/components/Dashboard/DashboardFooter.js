import React from "react";
import styles from "../../assets/styles/DashboardFooter.module.css";

const DashboardFooter = () => {
    return (
        <footer className={styles.main}>
            <p className={styles.content}>
                &copy; 2024{" "}
                <a href="https://mov.com.br/" target="_blank" className={styles.link} rel="noreferrer">
                    MOV
                </a>
                . Todos os direitos reservados.
            </p>
            <p className={styles.version}>Version 1.0</p>
        </footer>
    );
};

export default DashboardFooter;
