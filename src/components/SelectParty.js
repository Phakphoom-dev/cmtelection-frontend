import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import party01 from "../img/partys/Party01.jpg";
import party02 from "../img/partys/Party02.jpg";
import party03 from "../img/partys/Party03.jpg";
import party04 from "../img/partys/Party04.jpg";
import party05 from "../img/partys/Party05.jpg";
import party06 from "../img/partys/Party06.jpg";
import party07 from "../img/partys/Party07.jpg";
import Swal from "sweetalert2";
import axios from "axios";

const SelectParty = (props) => {
  const { id, name, room, isChoose, stdType } = props.stdInfo;
  const [partyType, setPartyType] = useState(0);
  const [partyScore, setPartyScore] = useState([]);
  const imgSrc = [
    party01,
    party02,
    party03,
    party04,
    party05,
    party06,
    party07,
  ];

  useEffect(() => {
    axios.get(`https://cmt-election.herokuapp.com/api/party`).then((res) => {
      setPartyScore(res.data);
    });
  }, []);

  const getScore = () => {
    let filterScore = [...partyScore];
    console.log(filterScore);
    const score = filterScore.filter((score) => {
      return score.id == partyType;
    });

    let partyInfo = {
      score: score[0].score,
      _id: score[0]._id,
      partyName: score[0].name,
    };

    return partyInfo;
  };

  const submitParyHandler = async (e) => {
    e.preventDefault();
    const currentPartyInfo = getScore();
    const { score, _id, partyName } = currentPartyInfo;
    const stdId = props.stdInfo._id;
    const url = `https://cmt-election.herokuapp.com/api/party/${_id}/${stdId}/${stdType}/${score}`;
    if (partyType === null || partyType === "" || partyType === undefined) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาตรวจสอบ",
        text: "กรุณาเลือกพรรคที่ต้องการ",
      });
    } else {
      Swal.fire({
        title: `ท่านต้องการจะเลือก ${partyName} หรือไม่`,
        text: "โปรดตรวจสอบให้แน่ หลังยืนยันแล้วจะไม่สามารถแก้ไขได้",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    }

    // const res = await axios.put(url).then((res) => {
    //   console.log(res);
    // });
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
        <Container className="mt-5">
          <Row className="justify-content-center align-items-center md-5">
            <Col xs={6}>
              <h3>กรุณากรอกรหัสนักศึกษา</h3>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default SelectParty;
