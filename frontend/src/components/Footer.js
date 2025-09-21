


































































































































import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Chinook Music Store</h5>
            <p>Your one-stop shop for digital music.</p>
          </Col>
          <Col md={3}>
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light">Home</a></li>
              <li><a href="/artists" className="text-light">Artists</a></li>
              <li><a href="/genres" className="text-light">Genres</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li>Email: info@chinookmusic.com</li>
              <li>Phone: (555) 123-4567</li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} Chinook Music Store. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;


































































































































