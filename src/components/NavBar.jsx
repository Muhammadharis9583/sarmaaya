import React from 'react'
import { Container } from "react-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="sarmaayaNav.jpg"
            width="110"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link href="symbols">Symbols</Nav.Link>
            <Nav.Link href="#trades">Trades</Nav.Link>
            <Nav.Link href="#protfolio">Portfolio</Nav.Link>
            <Nav.Link href="#hsitory">History</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <NavDropdown
              title={<FontAwesomeIcon icon={faUser} />}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar