import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import "./navbar.css";

function TournamentNavbar() {
  return (
    <Navbar className="nav">
      <Container>
        <Navbar.Brand className="brand">TOURNAMENT GENERATOR</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default TournamentNavbar;
