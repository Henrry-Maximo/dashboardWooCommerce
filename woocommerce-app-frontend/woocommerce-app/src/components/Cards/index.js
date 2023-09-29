import React, { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import "./styles.css";
import { fetchOrders } from "../../service/api";
import time from "../../images/time_orders.png";
import moment from "moment-timezone";
import PopoverComponent from "../../components/Popover/index.js";

import {
  calculateElapsedTime,
  determineBackgroundColor,
} from "../../utils/utils.js";

function OrderCard({ orderId, orderDate }) {

  const formattedDate = moment(orderDate).format('DD/MM/YYYY HH:mm:ss');

  return (
    <Card
    //   className={`order-card ${isHovered ? "hovered" : ""}`}
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    >
      <Card.Body>
        <Card.Title className="order-title-color">
          <div className="order-title">Pedido: {orderId}</div>
          <div
            className="timeOrders"
          // style={{ backgroundColor: backgroundColor }}
          >
            <img src={time} id="order-icon" alt="Time Icon" />
            <div className="colorTitleTime">
              <strong>
                <strong>00:00:00</strong>
              </strong>
            </div>
          </div>
        </Card.Title>
        <Card.Text className="order-text">
          <strong>Data</strong>: {formattedDate}
          <PopoverComponent order={orderId} />
        </Card.Text>
      </Card.Body>
    </Card >
  );
}

export default OrderCard;
