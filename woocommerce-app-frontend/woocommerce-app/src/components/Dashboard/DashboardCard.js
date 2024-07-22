import React, { useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

import Card from "react-bootstrap/Card";
import styles from "../../assets/styles/DashboardCard.module.css";
// import moment from "moment-timezone";
// import { fetchOrderSla } from "../../services/api.js";
// import { calculateBackgroundColor } from "../../utils/helpers.js";

// import PopoverComponent from "../../components/Popover/index.js";
import { RxLapTimer } from "react-icons/rx";
import { FaRegCheckCircle } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";

function OrderCard({ orderId, orderPrinted, orderDate, orderDateModified }) {
  // let [slaData, setSlaData] = useState({});
  // const [remainingTime, setRemainingTime] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  // valor data: formatação
  // const publishedDateFormatted = format(
  //   orderDate,
  //   "dd 'de' LLLL 'às' HH:mm'h'",
  //   {
  //     locale: ptBR,
  //   }
  // );

  const publishedDateModifiedFormatted = format(
    orderDateModified,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  // const publishedDate = format(orderDate, "dd'/'MM'/'yyyy HH:mm'h'", {
  //   locale: ptBR,
  // });

  const publishedModifiedDate = format(
    orderDateModified,
    "dd'/'MM'/'yyyy HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  // valor data: há cerca...
  // const publishedDateRelativeToNow = formatDistanceToNow(orderDate, {
  //   locale: ptBR,
  //   addSuffix: true,
  // });

  const publishedDateModifiedRelativeToNow = formatDistanceToNow(
    orderDateModified,
    {
      locale: ptBR,
      addSuffix: true,
    }
  );

  // useEffect(() => {
  //   async function fetchData() {
  //     const ordersData = await fetchOrderSla(orderId);

  //     if (!ordersData) {
  //       console.error("SLA não obtido.");
  //       return null;
  //     }

  //     try {
  //       setSlaData(
  //         ordersData.find((order) => order.order_id === orderId) || {}
  //       );

  //       calcularTempoRestante();
  //     } catch (error) {
  //       throw error;
  //     }
  //   }

  //   const calcularTempoRestante = () => {
  //     let agora = moment();
  //     let horarioAberturaPedido = moment(orderDate);
  //     let horarioFimSla = horarioAberturaPedido
  //       .clone()
  //       .add(slaData.sla_start, "hours");
  //     // console.log(`agora: ${agora}, horarioAberturaPedido: ${horarioAberturaPedido}, horarioFimSla: ${horarioFimSla}`);
  //     // Verifica se o SLA já expirou
  //     if (agora.isAfter(horarioFimSla)) {
  //       setRemainingTime("00:00:00");
  //       return;
  //     }

  //     const duracao = moment.duration(horarioFimSla.diff(agora));
  //     const horas = Math.floor(duracao.asHours());
  //     const minutos = duracao.minutes();
  //     const segundos = duracao.seconds();

  //     // Garante que minutos e segundos estejam no formato de dois dígitos
  //     const horasFormatadas = horas.toString().padStart(2, "0");
  //     const minutosFormatados = minutos.toString().padStart(2, "0");
  //     const segundosFormatados = segundos.toString().padStart(2, "0");

  //     setRemainingTime(
  //       `${horasFormatadas}:${minutosFormatados}:${segundosFormatados}`
  //     );
  //   };

  //   fetchData(); // Buscar dados imediatamente
  //   // const fetchDataInterval = setInterval(fetchData, 1000);

  //   calcularTempoRestante(); // Calcular o tempo restante imediatamente
  //   const calculateInterval = setInterval(calcularTempoRestante, 30000); // updante in seconds

  //   return () => {
  //     // clearInterval(fetchDataInterval);
  //     clearInterval(calculateInterval);
  //   };
  // }, [
  //   orderId,
  //   orderPrinted,
  //   orderDate,
  //   orderDateModified,
  //   slaData.date_order,
  //   slaData.sla_start,
  // ]);

  // const backgroundColor = calculateBackgroundColor(remainingTime); // alart for warning order
  return (
    <Card
      className={`animation-card  ${isHovered ? "hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body className={styles.container}>
        <Card.Title className={styles.title}>
          <Card.Subtitle style={{ fontSize: "1.40rem" }}>Pedido: {orderId}</Card.Subtitle>
          <Card.Text className={styles.cardTime}>
            {/* style={{ backgroundColor }} */}
            <RxLapTimer alt="Time Icon" />
            <div>{/* <strong>{remainingTime}</strong> */}</div>
          </Card.Text>
        </Card.Title>

        <Card.Text className={styles.cardDate}>
          <div className={styles.cardPrinted}>
          <strong>Impresso: </strong>
            {orderPrinted ? (    
              <FaRegCheckCircle
                style={{ background: "var(--green)", borderRadius: "10px" }}
              />
            ) : (
              <RxCrossCircled
                style={{ background: "var(--yellow)", borderRadius: "10px" }}
              />
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {/* <time title={publishedDateFormatted} dateTime={orderDate}>
              <div>
                <strong>Criado: </strong>
                {publishedDate}
                <PopoverComponent order={orderId} />
              </div>
              <div>{publishedDateRelativeToNow}</div>
            </time> */}
            <time
              title={publishedDateModifiedFormatted}
              dateTime={orderDateModified}
            >
              <div>
                <strong>Modificado: </strong>
                {publishedModifiedDate}
              </div>
              <div>{publishedDateModifiedRelativeToNow}</div>
            </time>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default OrderCard;
