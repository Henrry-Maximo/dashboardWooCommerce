import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import OrderCard from "../../components/Cards";
import { fetchOrders } from "../../service/api";
import "./styles.css";

// images
import { FaClipboardCheck } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";



function DashboardPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error("Erro na consulta dos pedidos.");
        return;
      }
    }

    const fetchDataInterval = setInterval(fetchData, 30000);
    return () => clearInterval(fetchDataInterval);
  }, []);

  const countOrdersByStatus = (status) => {
    return orders.filter(
      (order) => order.status === status).length;
  };

  const renderOrderCards = (status) => {
    return orders
      .filter((order) => order.status === status)
      .map((order) => (
        <OrderCard
          key={order.id}  // Chave única para cada OrderCard
          orderId={order.id_order}
          orderDate={order.date_created}
        />
      ));
  };

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <span className="centered-span">
            <div>
              <FaClipboardCheck className="position-icon" />
              Liberado:
              <div className="caixa">{countOrdersByStatus("nfe-emitida")}</div>
            </div>
          </span>
          <div className="column" id="colorStatusNfEmitida">
            {renderOrderCards("nfe-emitida")}
          </div>
        </Col>
        <Col md={3}>
          <span className="centered-span">
            <div>
              <FaBox className="position-icon" />
              Separação:
              <div className="caixa">
                {countOrdersByStatus("pedido_separacao")}
              </div>
            </div>
          </span>
          <p className="column" id="colorStatusSeparacao">
            {renderOrderCards("pedido_separacao")}
          </p>
        </Col>
        <Col md={3}>
          <span className="centered-span">
            <div>
              <FaExclamationCircle className="position-icon" />
              Coleta
            </div>
            <div className="caixa">{countOrdersByStatus("retirada")}</div>
          </span>
          <p className="column" id="colorStatusColeta">
            {renderOrderCards("retirada")}
          </p>
        </Col>
        <Col md={3}>
          <span className="centered-span">
            <div>
              <FaTruckFast className="position-icon" />
              Transporte:
              <div className="caixa">{countOrdersByStatus("transporte")}</div>
            </div>
          </span>
          <div>
            <p className="column" id="colorStatusTransporte">
              {renderOrderCards("transporte")}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
