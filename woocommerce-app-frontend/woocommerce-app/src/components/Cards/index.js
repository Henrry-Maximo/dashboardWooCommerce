import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import moment from "moment-timezone";
import { fetchOrderSla } from "../../service/api.js";
import time from "../../assets/img/time_orders.png";
import { calculateBackgroundColor } from "../../utils/utils.js";
// import PopoverComponent from "../../components/Popover/index.js";


function OrderCard({ orderId, orderDate }) {
  let [slaData, setSlaData] = useState({});
  const [remainingTime, setRemainingTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const ordersData = await fetchOrderSla(orderId);
        setSlaData(ordersData.find(order => order.order_id === orderId) || {});

        calcularTempoRestante();
      } catch (error) {
        throw error;
      }
    }

    const calcularTempoRestante = () => {
      let agora = moment();
      let horarioAberturaPedido = moment(orderDate);
      let horarioFimSla = horarioAberturaPedido.clone().add(slaData.sla_start, 'hours');
      // console.log(`agora: ${agora}, horarioAberturaPedido: ${horarioAberturaPedido}, horarioFimSla: ${horarioFimSla}`);
      // Verifica se o SLA já expirou
      if (agora.isAfter(horarioFimSla)) {
        setRemainingTime("00:00:00");
        return;
      }

      const duracao = moment.duration(horarioFimSla.diff(agora));
      const horas = Math.floor(duracao.asHours());
      const minutos = duracao.minutes();
      const segundos = duracao.seconds();

      // Garante que minutos e segundos estejam no formato de dois dígitos
      const horasFormatadas = horas.toString().padStart(2, '0');
      const minutosFormatados = minutos.toString().padStart(2, '0');
      const segundosFormatados = segundos.toString().padStart(2, '0');

      setRemainingTime(`${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`);
    };

    fetchData(); // Buscar dados imediatamente
    // const fetchDataInterval = setInterval(fetchData, 1000);

    calcularTempoRestante(); // Calcular o tempo restante imediatamente
    const calculateInterval = setInterval(calcularTempoRestante, 30000); // updante in seconds

    return () => {
      // clearInterval(fetchDataInterval);
      clearInterval(calculateInterval);
    };
  }, [orderId, slaData.date_order, slaData.sla_start]);


  const backgroundColor = calculateBackgroundColor(remainingTime); // alart for warning order
  return (
    <Card
      className={`order-card  ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <Card.Title className="order-title-color">
          <div className="order-title">Pedido: {orderId}</div>
          <div className="timeOrders" style={{ backgroundColor }}>
            <img src={time} id="order-icon" alt="Time Icon" />
            <div className="colorTitleTime" style={{ color: 'white' }}>
              <strong >{remainingTime}</strong>
            </div>
          </div>
        </Card.Title>
        <Card.Text className="order-text">
          <strong>Data</strong>: {moment(orderDate).format("DD/MM/YYYY HH:mm:ss")}
          {/* <PopoverComponent order={orderId} /> */}
        </Card.Text>
      </Card.Body>
    </Card >
  );
}

export default OrderCard;
