import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import time from "../../images/time_orders.png";
import moment from "moment-timezone";
import PopoverComponent from "../../components/Popover/index.js";
import {
  calculateElapsedTime,
  determineBackgroundColor,
} from "../../utils/utils.js";

function OrderCard({ order }) {
  moment.tz.setDefault("America/Sao_Paulo");

  const [isHovered, setIsHovered] = useState(false);
  // const [prevStatus, setPrevStatus] = useState(order.status);

  const slaTimes = {
    "nfe-emitida": 4,
    "pedido_separacao": 4,
    "retirada": 4,
    "transporte": 4,
  };

  const status = order.status;
  const prevStatusRef = useRef(order.status);
  const slaHours = slaTimes[status] || 0;
  const openingDate = moment(order.date);

  const [timeRemaining, setTimeRemaining] = useState(() => {
    const storedRemaining = localStorage.getItem(`timeRemaining_${order.id}`);
    return storedRemaining
      ? moment.duration(JSON.parse(storedRemaining))
      : moment.duration(slaHours, "hours");
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => {
        const remaining = moment.duration(Math.max(prevTimeRemaining.asMilliseconds() - 1000, 0));

        if (prevStatusRef.current !== status) {
          console.log("Status diferentes!")
          localStorage.removeItem(`timeRemaining_${order.id}`);
          return moment.duration(slaHours, "hours");
        }
        return remaining;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status, slaTimes, order.id]);

  const hoursRemaining = timeRemaining.hours();
  const minutesRemaining = timeRemaining.minutes();
  const secondsRemaining = timeRemaining.seconds();

  const formattedTimeRemaining = `${hoursRemaining.toString().padStart(2, "0")}:
   ${minutesRemaining.toString().padStart(2, "0")}:
   ${secondsRemaining.toString().padStart(2, "0")}`;

  const backgroundColor = determineBackgroundColor(
    hoursRemaining,
    minutesRemaining
  );

  return (
    <Card
      className={`order-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <Card.Title className="order-title-color">
          <div className="order-title">Pedido: {order.id}</div>
          <div
            className="timeOrders"
            style={{ backgroundColor: backgroundColor }}
          >
            <img src={time} id="order-icon" alt="Time Icon" />
            <div className="colorTitleTime">
              <strong>
                <strong>{formattedTimeRemaining}</strong>
              </strong>
            </div>
          </div>
        </Card.Title>
        <Card.Text className="order-text">
          <strong>Data</strong>: {openingDate.format("DD/MM/YYYY HH:mm:ss")}
          <PopoverComponent order={order} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default OrderCard;
