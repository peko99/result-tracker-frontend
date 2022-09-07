import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../Navbar/Navbar.jsx";
import Table from "../Table/Table.jsx";
import "./main.css";
import moment from "moment";

function MatchForm() {
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleCreateMatch = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        home_team: inputs.homeTeam,
        away_team: inputs.awayTeam,
        home_goals: parseInt(inputs.result.split(":")[0]),
        away_goals: parseInt(inputs.result.split(":")[1]),
        date_played: moment().format("YYYY-MM-DDThh:mm:ssZ"),
      }),
    };
    fetch("http://127.0.0.1:5000/game", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("API request was not successful!");
        }
        return true;
      })
      .catch((error) => {
        alert("Failed to create game");
        console.log("There has been a problem", error);
      });
    setInputs("");
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Navbar />
        <Col>
          <form id="tournament_form" onSubmit={handleCreateMatch}>
            <label>HOME TEAM:</label>
            <input
              className="input"
              id="inputField"
              type="text"
              name="homeTeam"
              value={inputs.homeTeam || ""}
              onChange={handleChange}
            />
            <label>AWAY TEAM:</label>
            <input
              className="input"
              id="inputField"
              type="text"
              name="awayTeam"
              value={inputs.awayTeam || ""}
              onChange={handleChange}
            />
            <label>RESULT:</label>
            <input
              className="input"
              id="inputField"
              type="text"
              name="result"
              value={inputs.result || ""}
              onChange={handleChange}
            />
            <input
              className="btn"
              id="inputButton"
              type="submit"
              value="REGISTER GAME"
            />
          </form>
        </Col>
        <Col lg={1}></Col>
        <Col>
          <Table />
        </Col>
      </Row>
    </Container>
  );
}

export default MatchForm;
