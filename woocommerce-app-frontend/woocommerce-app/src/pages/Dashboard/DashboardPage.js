import "bootstrap/dist/css/bootstrap.min.css";
import OrderCard from "../../components/Cards";
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { fetchOrders } from "../../service/api";
import imgPedido from "../../images/nf-emitidaDash.png";
import imgSeparacao from "../../images/separacaoDash.png";
import imgColeta from "../../images/coletaDash.png";
import imgTransporte from "../../images/transporteDash.png";
import "./styles.css";
// import { determineBackgroundColor } from "../../utils/utils.js";

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

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const countOrdersByStatus = (status) => {
    return orders.filter((order) => order.status === status).length;
  };

  const renderOrderCards = (status) => {
    return orders
      .filter((order) => order.status === status)
      .map((order) => <OrderCard key={order.id} order={order} />);
  };

  

  return (
    <Container fluid className="dashboard-container">
      <Row className="body">
        <Col md={3}>
          <span className="centered-span">
            <div>
              <img src={imgPedido} className="position-icon" />
              Novo Pedido:{" "}
              <div className="caixa">{countOrdersByStatus("nfe-emitida")}</div>
            </div>
          </span>
          <p className="column" id="colorStatusNfEmitida">
            {renderOrderCards("nfe-emitida")}
          </p>
        </Col>
        <Col md={3}>
          <span className="centered-span">
            <div>
              <img src={imgSeparacao} className="position-icon" />
              Seperação:{" "}
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
              Aguardando Coleta
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
              Transporte:{" "}
              <div className="caixa">{countOrdersByStatus("transporte")}</div>
            </div>
          </span>
          <p className="column" id="colorStatusTransporte">
            {renderOrderCards("transporte")}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardPage;
