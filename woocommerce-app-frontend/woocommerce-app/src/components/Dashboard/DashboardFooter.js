import React from "react";
import "../../assets/styles/DashboardFooter.css";

const DashboardFooter = () => {
    return (
        <footer className="dashboard-footer">
            <p className="config">
                &copy; 2024{" "}
                <a href="https://mov.com.br/" target="_blank" className="a-link">
                    MOV
                </a>
                . Todos os direitos reservados.
            </p>
            <p className="version">Version 1.0</p>
        </footer>
    );
};

export default DashboardFooter;
