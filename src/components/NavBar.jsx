import { Container } from "react-bootstrap";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "../styles/NavBar.css";

function NavBar() {
  const logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/symbols">
          <img
            alt="homePage"
            src="sarmaayaNav.jpg"
            width="110"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* -------------- nav links --------------- */}
          <Nav className="mx-auto d-flex">
            <NavLink to="/symbols" className="nav-link" activeclassname="active">
              Symbols
            </NavLink>
            <NavLink to="/trades" className="nav-link" activeclassname="active">
              Trades
            </NavLink>
            <NavLink to="/portfolio" className="nav-link" activeclassname="active">
              Portfolio
            </NavLink>
            <NavLink to="/history" className="nav-link" activeclassname="active">
              History
            </NavLink>
          </Nav>

          {/* -------------- dropdown -------------- */}
          <Nav className="ml-auto">
            <NavDropdown
              title={
                <>
                  <FontAwesomeIcon icon={faUser} /> Haris
                </>
              }
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#settings">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
