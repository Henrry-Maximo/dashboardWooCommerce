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
    let ordersNewData = await fetchOrders();
    setOrders(ordersNewData);
  };

  useEffect(() => {
    getOrdersApi();
  }, [orders]);

  // Contador de Pedidos da Coluna
  const countOrdersByStatus = (status) => {
    try {
      if (orders) {
        return orders.filter((order) => order.status === status).length;
      } else {
        throw new Error("Falha na conexão.");
      }
    } catch (error) {
      // Você pode optar por retornar 0 ou outra resposta adequada em caso de erro
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
            orderId={order.id_order}
            orderDate={order.date_created}
          />
        ));
    } else {
      // Exibir uma mensagem de carregamento ou erro na interface do usuário
      return <p>Falha na conexão.<br/>Por favor, tente novamente mais tarde.</p>;
    }
  };

  return (
    <div className="dashboard-content">
      <div className="dashboard-column">
        <span className="dashboard-status">
          <FaClipboardCheck className="dashboard-icon" />
          Liberado:
        </span>
        <div className="dashboard-count">{countOrdersByStatus("nfe-emitida")}</div>
        <div className="dashboard-cards">{renderOrderCards("nfe-emitida")}</div>
      </div>
      <div className="dashboard-column">
        <span className="dashboard-status">
          <FaBox className="dashboard-icon" />
          Separação:
        </span>
        <div className="dashboard-count">{countOrdersByStatus("pedido_separacao")}</div>
        <div className="dashboard-cards">{renderOrderCards("pedido_separacao")}</div>
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
        <div className="dashboard-count">{countOrdersByStatus("transporte")}</div>
        <div className="dashboard-cards">{renderOrderCards("transporte")}</div>
      </div>
    </div>
  );
}

export default DashboardCenter;
