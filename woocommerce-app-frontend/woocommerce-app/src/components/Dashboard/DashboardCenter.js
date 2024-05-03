import React, { useState, useEffect } from "react";

import { fetchOrders } from "../../services/api.js";
import OrderCard from "./DashboardCard.js";
import "../../assets/styles/Dashboard.css";

// icons
import { FaClipboardCheck } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";

function DashboardCenter() {
  const [orders, setOrders] = useState([]);

  const getOrdersApi = async () => {
    const ordersNewData = await fetchOrders();

    // if (!ordersNewData) {
    //   console.error("Pedidos não obtidos.")
    //   return null;
    // }

    try {
      setOrders(ordersNewData);
    } catch (err) {
      console.error(err);
    }
  };

   

  // Contador de Pedidos da Coluna
  const countOrdersByStatus = (status) => {
    try {
      if (orders) {
        return orders.filter((order) => order.status === status).length;
      } else {
        throw new Error("Falha na conexão.");
      }
    } catch (error) {
      return 0;
    }
  };

  const renderOrderCards = (status) => {
    if (orders) {
      return orders
        .filter((order) => order.status === status)
        .map((order) => (
          <OrderCard
            key={order.id}
            orderId={order.order_number}
            orderPrinted={order.printed}
            orderDate={order.date_created}
            orderDateModified={order.date_modified}
          />
        ));
    } else {
      // Exibir uma mensagem de carregamento ou erro na interface do usuário
      return (
        <p style={{ textAlign: "center" }}>
          Falha na conexão.
          <br />
          Por favor, tente novamente mais tarde.
        </p>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 30000)); // Espera 15 segundos
        console.log("Atualização em 30 segundos");
        getOrdersApi();
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard-column">
        <span className="dashboard-status">
          <FaClipboardCheck className="dashboard-icon" />
          Liberado:
        </span>
        <div className="dashboard-count">
          {countOrdersByStatus("nfe-emitida")}
        </div>
        <div className="dashboard-cards">{renderOrderCards("nfe-emitida")}</div>
      </div>
      <div className="dashboard-column">
        <span className="dashboard-status">
          <FaBox className="dashboard-icon" />
          Separação:
        </span>
        <div className="dashboard-count">
          {countOrdersByStatus("pedido_separacao")}
        </div>
        <div className="dashboard-cards">
          {renderOrderCards("pedido_separacao")}
        </div>
      </div>
      <div className="dashboard-column">
        <span className="dashboard-status">
          <FaExclamationCircle className="dashboard-icon" />
          Coleta:
        </span>
        <div className="dashboard-count">{countOrdersByStatus("retirada")}</div>
        <div className="dashboard-cards">{renderOrderCards("retirada")}</div>
      </div>
      <div className="dashboard-column">
        <span className="dashboard-status">
          <FaTruckFast className="dashboard-icon" />
          Transporte:
        </span>
        <div className="dashboard-count">
          {countOrdersByStatus("transporte")}
        </div>
        <div className="dashboard-cards">{renderOrderCards("transporte")}</div>
      </div>
    </div>
  );
}

export default DashboardCenter;
