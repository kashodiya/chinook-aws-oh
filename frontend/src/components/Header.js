































































































































import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Chinook Music Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/artists">
              Artists
            </Nav.Link>
            <Nav.Link as={NavLink} to="/genres">
              Genres
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/cart">
              Cart {cartItems.length > 0 && (
                <Badge bg="primary" pill>
                  {cartItems.length}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;































































































































