import { NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import App from "./App";

function Header({ isAuth, isAdmin, handleLogout }) {
  const userHeader = () => (
    <>
      <Container>
        <Navbar bg="dark">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/login">
            Login
          </Nav.Link>
        </Navbar>
      </Container>
    </>
  );

  const authUserHeader = () => (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/user/articles">
                My Articles
              </Nav.Link>
              <Nav.Link as={NavLink} to="/user/articles/new">
                Create Article
              </Nav.Link>
            </Nav>
            <Nav>
              {isAdmin && (
                <Nav.Link as={NavLink} to="/articles/new">
                  Admin
                </Nav.Link>
              )}
              <Nav.Link onClick={() => handleLogout()}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

  const navHeader = (
    <Navbar bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Container>
        <Nav className="me-auto">
          {isAuth ? authUserHeader() : userHeader()}
        </Nav>
      </Container>
    </Navbar>
  );

  return <nav>{navHeader}</nav>;
}

export default Header;
