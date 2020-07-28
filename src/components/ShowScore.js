import React from "react";
import logo from "../img/cmt-logo-whiteRoundBG-01.png";
import { Container, Row, Col } from "react-bootstrap";

const ShowScore = () => {
  return (
    <Container fluid className="md-5 text-center">
      <Row className="justify-content-center align-items-center">
        <Col>
          <img src={logo} className="App-logo" alt="logo" />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <h2>การเลือกตั้งองค์การนักศึกษา ปีการศึกษา 2020</h2>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowScore;
