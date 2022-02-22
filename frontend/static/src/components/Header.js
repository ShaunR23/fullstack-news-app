import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import {useState} from "react"



function Header({setSelection}) {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Nav className="me-auto">
      <Nav.Link href="#home"> Login </Nav.Link>
      <Nav.Link href="#article-list">Article List</Nav.Link>
      <Nav.Link href="#article-form">Article Form</Nav.Link>
      <Nav.Link href="#create-article">Create Article</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
}

export default Header;