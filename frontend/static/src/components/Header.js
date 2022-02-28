import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import {useState} from "react"
import App from "./App";
import { NavLink, useOutletContext } from "react-router-dom";

function Header(props, {handleLogout}) {


const navHeader = (
  <Navbar bg="dark" variant="dark">
      <Container>
       <Nav className="me-auto">

        <Nav.Link as={NavLink} to='/articles'> View Articles</Nav.Link>
         <Nav.Link as={NavLink} to='/articleForm'> Create Articles</Nav.Link>
          <Nav.Link as={NavLink} to= '/login'> Login/Logout </Nav.Link>
         <Nav.Link as={NavLink} to='/register'>Create an Account</Nav.Link>
         <Nav.Link as={NavLink} to='/admin'> Review Articles(admin)</Nav.Link>
         
         
       </Nav>
       </Container>
      </Navbar>
)


return (
  <nav>
    {navHeader}
      
  </nav>
)
}
//   return (
//     
// }

export default Header;