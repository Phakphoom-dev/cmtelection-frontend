import React, { useState } from "react";
import Swal from "sweetalert2";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import SelectParty from "./SelectParty";
import { Ring } from "react-spinners-css";

const ElectionForm = () => {
  const [stdType, setStdType] = useState("");
  const [stdId, setStdId] = useState("");
  const [stdInfo, setStdInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const emptyForm = () => {
    setStdInfo({});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (stdType && stdId) {
      axios
        .get(`https://cmt-election.herokuapp.com/api/std/${stdId}/${stdType}`)
        .then((res) => {
          if (res.data[0].isChoose) {
            setIsLoading(false);
            setStdId("");
            setStdType("");
            Swal.fire({
              icon: "warning",
              title: "คำเตือน",
              text: "นักศึกษาได้ทำการเลือกไปแล้ว",
            }).then((result) => {
              emptyForm();
            });
          } else {
            setIsLoading(false);
            setStdInfo(res.data[0]);
            setStdId("");
            setStdType("");
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "กรุณาลองใหม่อีกครั้งหรือติดต่อผู้ดูแล",
          }).then((result) => {
            emptyForm();
            setStdId("");
            setStdType("");
          });
        });
    } else {
      setIsLoading(false);
      Swal.fire({
        icon: "info",
        title: "กรุณาตรวจสอบ",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
    }
  };

  return (
    <Container fluid className="mt-5 text-center">
      {isLoading ? (
        <Container style={{ marginTop: "3rem" }}>
          <Ring size={300} color="#282c34" />
        </Container>
      ) : (
        <Container className="bg-white">
          <Row className="justify-content-center align-items-center">
            <Col xs={6}>
              <Form.Check
                inline
                label="ฝั่งพาณิชย์"
                type="radio"
                name="stdType"
                value={stdType}
                onChange={() => setStdType("C")}
              />
              <Form.Check
                inline
                label="ฝั่งเมโทร"
                type="radio"
                name="stdType"
                value={stdType}
                onChange={() => setStdType("M")}
              />
            </Col>
          </Row>

          <Row className="justify-content-center align-items-center mt-2">
            <Col xs={6}>
              <Form onSubmit={submitHandler}>
                <Form.Control
                  type="text"
                  maxLength={7}
                  placeholder="กรุณากรอกรหัสนักศึกษา"
                  value={stdId}
                  onChange={(e) => setStdId(e.target.value)}
                />
                <Button variant="primary" type="submit" className="mt-2">
                  ยืนยัน
                </Button>
              </Form>
            </Col>
          </Row>
          <SelectParty stdInfo={stdInfo} />
        </Container>
      )}
    </Container>
  );
};

export default ElectionForm;
