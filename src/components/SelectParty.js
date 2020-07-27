import React, { useState } from "react";
import { Container, Row, Col, Badge, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import party01 from "../img/partys/Party01.jpg";
import party02 from "../img/partys/Party02.jpg";
import party03 from "../img/partys/Party03.jpg";
import party04 from "../img/partys/Party04.jpg";
import party05 from "../img/partys/Party05.jpg";
import party06 from "../img/partys/Party06.jpg";
import party07 from "../img/partys/Party07.jpg";
import Swal from "sweetalert2";

const SelectParty = (props) => {
  const { id, name, room, isChoose } = props.stdInfo;
  const [partyType, setPartyType] = useState("");

  const imgSrc = [
    party01,
    party02,
    party03,
    party04,
    party05,
    party06,
    party07,
  ];

  const submitParyHandler = (e) => {
    e.preventDefault();
    console.log(partyType);
    if (partyType === null || partyType === "" || partyType === undefined) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาตรวจสอบ",
        text: "กรุณาเลือกพรรคที่ต้องการ",
      });
    }
  };

  return (
    <Container className="mt-5">
      {isChoose ? (
        <Redirect push to="/" />
      ) : id !== undefined ? (
        <Container>
          <Row>
            <Col>
              <h5>รหัสนักศึกษา {id}</h5>
            </Col>
            <Col>
              <h5>ชื่อ {name}</h5>
            </Col>
            <Col>
              <h5>
                {props.stdInfo.class} {room}
              </h5>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <h2>กรุณาเลือกพรรคที่ต้องการ</h2>
            </Col>
          </Row>

          <Row className="show-party">
            {imgSrc.map((value, index) => {
              return (
                <label key={index} className="list-party">
                  <input
                    type="radio"
                    name="test"
                    value={index + 1}
                    alt={"partys image"}
                    onChange={(e) => setPartyType(e.target.value)}
                  />
                  <img src={value} />
                </label>
              );
            })}
          </Row>

          <Row className="justify-content-center align-items-center m-5">
            <Col xs={6}>
              <Form onSubmit={submitParyHandler}>
                <Button variant="primary" type="submit">
                  ยืนยัน
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      ) : (
        <Badge variant="secondary" className="p-2">
          <h1 style={{ color: "white" }}>กรุณากรอกรหัสนักศึกษา</h1>
        </Badge>
      )}
    </Container>
  );
};

export default SelectParty;
