




























































































































































































import React from 'react';
import { Container, Table, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, clearCart, calculateTotal } = useCart();

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Container>
      <h1 className="mb-4">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <Alert variant="info">
          Your cart is empty. <Link to="/">Continue shopping</Link>
        </Alert>
      ) : (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Track</th>
                <th>Album</th>
                <th>Artist</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <Link to={`/albums/${item.album.id}`}>
                      {item.album.title}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/artists/${item.album.artist.id}`}>
                      {item.album.artist.name}
                    </Link>
                  </td>
                  <td>${item.unitPrice.toFixed(2)}</td>
                  <td>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          
          <Row className="mt-4">
            <Col md={6}>
              <Button 
                variant="outline-secondary" 
                onClick={clearCart}
                className="me-2"
              >
                Clear Cart
              </Button>
              <Button 
                variant="outline-primary" 
                as={Link} 
                to="/"
              >
                Continue Shopping
              </Button>
            </Col>
            <Col md={6}>
              <Card className="float-end" style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>Order Summary</Card.Title>
                  <Table size="sm">
                    <tbody>
                      <tr>
                        <td>Subtotal ({cartItems.length} items):</td>
                        <td className="text-end">${calculateTotal().toFixed(2)}</td>
                      </tr>
                      <tr>
                        <td>Tax:</td>
                        <td className="text-end">${(calculateTotal() * 0.1).toFixed(2)}</td>
                      </tr>
                      <tr>
                        <th>Total:</th>
                        <th className="text-end">${(calculateTotal() * 1.1).toFixed(2)}</th>
                      </tr>
                    </tbody>
                  </Table>
                  <Button 
                    variant="success" 
                    className="w-100"
                    onClick={proceedToCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default CartPage;




























































































































































































