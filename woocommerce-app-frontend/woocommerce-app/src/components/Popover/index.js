import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Popover as BootstrapPopover } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Imagenotification from "../../assets/images/alertNotification.png";
import "./styles.css";

const PopoverComponent = ({ order }) => {
    const [showPopover, setShowPopover] = useState(false);

    const togglePopover = () => {
        setShowPopover(!showPopover);
    };

    // const renderProductDetails = () => {
    //     return order.map((item) => (
    //         <div>
    //             {/* <div className="product-name">{item.name}</div> */}
    //             {/* <div>
    //                 <strong>Total:</strong> {item.quantity}
    //             </div>
    //             <div>
    //                 <strong>SKU:</strong> {item.sku}
    //             </div>
    //             <div>
    //                 <strong>Cliente</strong>: {order.shipping.first_name}{" "}
    //                 {order.shipping.last_name}
    //             </div> */}
    //         </div>
    //     ));
    // };

    const popover = (
        <BootstrapPopover id={`popover-${order.orderId}`} className="custom-popover">
            <BootstrapPopover.Header
                as="h3"
                className="popover-header"
            >
                Detalhes do Pedido
            </BootstrapPopover.Header>
            {/* <BootstrapPopover.Body>
                {renderProductDetails()}
                {/* <strong>Endereço de Entrega:</strong> {order.shipping.address_1} */}
            {/* </BootstrapPopover.Body> * /} */}
        </BootstrapPopover >
    );

    return (
        <OverlayTrigger
            trigger={["hover", "focus"]}
            show={showPopover}
            placement="top"
            onToggle={togglePopover}
            overlay={popover}
        >
            <div className="popover-trigger">
                <img
                    src={Imagenotification}
                    alt="Notification"
                    className="popover-image"
                />
            </div>
        </OverlayTrigger>
    );
};

export default PopoverComponent;
