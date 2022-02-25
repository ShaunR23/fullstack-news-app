import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import {useState} from "react"
import App from "./App";
import { NavLink, useOutletContext } from "react-router-dom";

function Header() {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Nav className="me-auto">
      <Nav.Link as={NavLink} to= '/login' className='nav-link'> Login </Nav.Link>
      <Nav.Link as={NavLink} to='/articles'>Articles</Nav.Link>
      <Nav.Link as={NavLink} to='/articleForm'>Article Form</Nav.Link>
      <Nav.Link as={NavLink} to='/register'>Register</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
}

export default Header;