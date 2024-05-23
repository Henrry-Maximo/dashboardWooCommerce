import React, { useState, useEffect } from "react";

import { fetchOrders, operatorsInOrders } from "../../services/api.js";
import OrderCard from "./DashboardCard.js";
import AnimatedCircles from "./DashboardLoading.js";
import styles from "../../assets/styles/Dashboard.module.css";

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
        <div>
          <AnimatedCircles  />
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Espera 15 segundos
        console.log("Atualização em 30 segundos");
        getOrdersApi();
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const operatorsDataOrders = async () => {
      while (true) {
        await new Promise((resolve) => setTimeout(resolve, 30000)); // Espera 15 segundos
        console.log("Atualização em 30 segundos");
        await operatorsInOrders();
      }
    };

    operatorsDataOrders();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.columnStatus}>
        <span className={styles.titleStatus}>
          <FaClipboardCheck className={styles.iconByStatus} />
          Liberado:
        </span>
        <div className={styles.countByStatus}>
          {countOrdersByStatus("nfe-emitida")}
        </div>
        <div className={styles.bodyCard}>{renderOrderCards("nfe-emitida")}</div>
      </div>
      <div className={styles.columnStatus}>
        <span className={styles.titleStatus}>
          <FaBox className={styles.iconByStatus} />
          Separação:
        </span>
        <div className={styles.countByStatus}>
          {countOrdersByStatus("pedido_separacao")}
        </div>
        <div className={styles.bodyCard}>
          {renderOrderCards("pedido_separacao")}
        </div>
      </div>
      <div className={styles.columnStatus}>
        <span className={styles.titleStatus}>
          <FaExclamationCircle className={styles.iconByStatus} />
          Coleta:
        </span>
        <div className={styles.countByStatus}>
          {countOrdersByStatus("retirada")}
        </div>
        <div className={styles.bodyCard}>{renderOrderCards("retirada")}</div>
      </div>
      <div className={styles.columnStatus}>
        <span className={styles.titleStatus}>
          <FaTruckFast className={styles.iconByStatus} />
          Transporte:
        </span>
        <div className={styles.countByStatus}>
          {countOrdersByStatus("transporte")}
        </div>
        <div className={styles.bodyCard}>{renderOrderCards("transporte")}</div>
      </div>
    </div>
  );
}

export default DashboardCenter;
