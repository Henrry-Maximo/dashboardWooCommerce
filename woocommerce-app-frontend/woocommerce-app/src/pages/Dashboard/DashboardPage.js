import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

import React, { useState, useEffect } from "react";
import OrderCard from "../../components/Cards";
import { fetchOrders } from "../../service/api";

import imgPedido from "../../images/nf-emitidaDash.png";
import imgSeparacao from "../../images/separacaoDash.png";
import imgColeta from "../../images/coletaDash.png";
import imgTransporte from "../../images/transporteDash.png";
import "./styles.css";

function DashboardPage() {
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    async function fetchData() {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Erro ao obter ordens:", error);
      }
    }
    const fetchDataInterval = setInterval(fetchData, 1000);
    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(fetchDataInterval);
  }, []);

  // Parâmetro representa o status que queremos contar no array orders.
  const countOrdersByStatus = (status) => {
    return orders.filter(
      (order) => order.status === status).length; // status da ordem seja igual ao do parâmetro
  };

  // Renderização do Card (id, data de criação)
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
    <Container fluid className="dashboard-container">
      <Row className="body">
        <Col md={3}>
          <span className="centered-span">
            <div>
              <img src={imgPedido} className="position-icon" />
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
              <img src={imgSeparacao} className="position-icon" />
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
              <img src={imgColeta} className="position-icon" />
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
              <img src={imgTransporte} className="position-icon" />
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
