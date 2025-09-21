






























































































































































































































import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const { cartItems, clearCart, calculateTotal } = useCart();

  const calculateSubtotal = () => {
    return calculateTotal();
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1;
  };

  const calculateTotalWithTax = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    
    // Process payment (dummy implementation)
    setPaymentProcessed(true);
    setOrderNumber(`ORD-${Math.floor(Math.random() * 1000000)}`);
    
    // Clear the cart after successful payment
    clearCart();
    
    // In a real application, we would:
    // 1. Send payment info to payment processor
    // 2. Create order in database
    // 3. Redirect to order confirmation page
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (paymentProcessed) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Alert variant="success">
              <Alert.Heading>Order Successful!</Alert.Heading>
              <p>
                Thank you for your purchase. Your order number is <strong>{orderNumber}</strong>.
              </p>
              <p>
                You will receive an email confirmation shortly with details about your purchase.
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={handleContinueShopping} variant="outline-success">
                  Continue Shopping
                </Button>
              </div>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <h1 className="mb-4">Checkout</h1>
      
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <h5 className="mb-0">Billing Information</h5>
            </Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Email"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Address"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="City"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your city.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="state">
                      <Form.Label>State</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="State"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your state.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group controlId="zip">
                      <Form.Label>Zip</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Zip"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your zip code.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <h5 className="mt-4 mb-3">Payment Information</h5>
                <Form.Group className="mb-3" controlId="cardName">
                  <Form.Label>Name on Card</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Name on card"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide the name on your card.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="cardNumber">
                  <Form.Label>Card Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Card number"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide your card number.
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group controlId="expiration">
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="MM/YY"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your card's expiration date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="cvv">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="CVV"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your card's CVV.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 mt-4">
                  <Button variant="primary" type="submit">
                    Complete Purchase
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <p>{cartItems.length} items</p>
              {cartItems.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <span>{item.name}</span>
                  <span>${item.unitPrice.toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${calculateTax().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Total:</strong>
                <strong>${calculateTotalWithTax().toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;






























































































































































































































