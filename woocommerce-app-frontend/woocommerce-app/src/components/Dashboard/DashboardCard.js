import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import "../../assets/styles/DashboardCard.css";
import moment from "moment-timezone";
import { fetchOrderSla } from "../../services/api.js";
import { calculateBackgroundColor } from "../../utils/helpers.js";
// import PopoverComponent from "../../components/Popover/index.js";
// import "bootstrap/dist/css/bootstrap.min.css";
import { RxLapTimer } from "react-icons/rx";

function OrderCard({ orderId, orderDate }) {
  let [slaData, setSlaData] = useState({});
  const [remainingTime, setRemainingTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const ordersData = await fetchOrderSla(orderId);
        setSlaData(
          ordersData.find((order) => order.order_id === orderId) || {}
        );

        calcularTempoRestante();
      } catch (error) {
        throw error;
      }
    }

    const calcularTempoRestante = () => {
      let agora = moment();
      let horarioAberturaPedido = moment(orderDate);
      let horarioFimSla = horarioAberturaPedido
        .clone()
        .add(slaData.sla_start, "hours");
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
      const horasFormatadas = horas.toString().padStart(2, "0");
      const minutosFormatados = minutos.toString().padStart(2, "0");
      const segundosFormatados = segundos.toString().padStart(2, "0");

      setRemainingTime(
        `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`
      );
    };

    fetchData(); // Buscar dados imediatamente
    // const fetchDataInterval = setInterval(fetchData, 1000);

    calcularTempoRestante(); // Calcular o tempo restante imediatamente
    const calculateInterval = setInterval(calcularTempoRestante, 30000); // updante in seconds

    return () => {
      // clearInterval(fetchDataInterval);
      clearInterval(calculateInterval);
    };
  }, [orderId, orderDate, slaData.date_order, slaData.sla_start]);

  const backgroundColor = calculateBackgroundColor(remainingTime); // alart for warning order
  return (
    <Card
      className={`animation-card  ${isHovered ? "hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body id="container-card">
          <Card.Title className="card-title">
          <div>Pedido: {orderId}</div>
            <Card.Text className="card-time" style={{ backgroundColor }}>
              <RxLapTimer alt="Time Icon" />
              <div>
                <strong>{remainingTime}</strong>
              </div>
            </Card.Text>
          </Card.Title>

        <Card.Text className="card-data">
          <strong>Data</strong>:{" "}
          {moment(orderDate).format("DD/MM/YYYY HH:mm:ss")}
          {/* <PopoverComponent order={orderId} /> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default OrderCard;
