import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import {useState} from "react"
import App from "./App";



function Header({setSelection}) {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
    <Nav className="me-auto">
      <Nav.Link onClick={() => setSelection('login')}> Login </Nav.Link>
      <Nav.Link onClick={() => setSelection('articleList')}>Article List</Nav.Link>
      <Nav.Link onClick={() => setSelection('articleForm')}>Article Form</Nav.Link>
      <Nav.Link onClick={() => setSelection('createArticle')}>Create Article</Nav.Link>
    </Nav>
    </Container>
  </Navbar>
  );
}

export default Header;