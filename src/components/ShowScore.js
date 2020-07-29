import React, { useState, useEffect } from "react";
import logo from "../img/cmt-logo-whiteRoundBG-01.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import party01 from "../img/partys/Party01.jpg";
import party02 from "../img/partys/Party02.jpg";
import party03 from "../img/partys/Party03.jpg";
import party04 from "../img/partys/Party04.jpg";
import party05 from "../img/partys/Party05.jpg";
import party06 from "../img/partys/Party06.jpg";
import party07 from "../img/partys/Party07.jpg";

const ShowScore = () => {
  const [scoreList, setScoreList] = useState([]);
  const [isScoreList, setIsScoreList] = useState(true);
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
    axios
      .get("https://cmt-election.herokuapp.com/api/party/")
      .then((res) => {
        setScoreList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const scoreResult = () => {
    console.log(imgSrc);
    let list = [...scoreList];
    console.log("list", list);
    setIsScoreList(!isScoreList);
  };

  return (
    <Container fluid className="md-5 text-center">
      {isScoreList ? (
        <Container>
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

          <Row className="mt-3">
            <Col>
              <Button variant="info" onClick={scoreResult}>
                ดูผลคะแนน
              </Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          <Row className="show-party">
            {scoreList.map((list, index) => {
              return (
                <label key={index} className="list-party">
                  <img src={list.img} />
                  <p>{list.name}</p>
                  <p>{list.score}</p>
                </label>
              );
            })}
          </Row>

          <Row className="mt-3">
            <Col>
              <Button variant="info" onClick={scoreResult}>
                ดูผลคะแนน
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
};

export default ShowScore;
