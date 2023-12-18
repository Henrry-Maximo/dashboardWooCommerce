import React from 'react';
import styles from './Header.module.css';
import { Row, Col } from "react-bootstrap";
import imgLogo from "../../assets/images/mov-logo.png";

const Header = () => {
  return (
    <div>
      <Row className={styles.cabecalho}>
        <Col className={styles.cabecalhoStyle}>
          <h1 className={styles.titleAnimation}>
            <img src={imgLogo} className={styles.sizeImg} />
          </h1>
        </Col>
      </Row>
    </div>
  )
}

export default Header;
