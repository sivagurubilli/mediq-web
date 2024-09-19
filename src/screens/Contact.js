import React, { useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Contact.css'; // Make sure the path is correct

const Contact = () => {
  useEffect(() => {
    document.body.classList.add('contact-page');
    return () => {
      document.body.classList.remove('contact-page');
    };
  }, []);
  return (
    <Container className='contact-container'>
      <div className='contact-content'>
        <Row>
          <Col md={6} className="mx-auto">
            <div className='contact-form'>
              <Form>
                <h2 className='mt-4'>Contact Us</h2>
                <p>Feel free to contact us any time. We will get back to you as soon as we can!</p>
                
                {/* Company Name */}
                <Form.Group controlId="formCompanyName" className="mb-3">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your company name" className="contact-form-control" />
                </Form.Group>

                {/* Email */}
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" className="contact-form-control" />
                </Form.Group>

                {/* Phone Number */}
                <Form.Group controlId="formPhoneNumber" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="Enter your phone number" className="contact-form-control" />
                </Form.Group>

                {/* Address */}
                <Form.Group controlId="formAddress" className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter your address" className="contact-form-control" />
                </Form.Group>

                {/* Message */}
                <Form.Group controlId="formMessage" className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={1} placeholder="Enter your message" className="contact-form-control" />
                </Form.Group>
                
               
              </Form>
            </div>
          </Col>

          <Col>
            <div className='contact-info'>
              <div className="contact-info-bg p-3 text-light">
                <h5 className='mt-4 ml-3'>Info</h5>
                <p className='ml-3'>
                  <i className="fas fa-envelope mr-2 mt-4"></i> reach@lyfguard.in
                </p>
                <p className='ml-3'>
                  <i className="fas fa-phone mr-2 mt-4"></i> 1800-889-1258
                </p>
                <p className='ml-3'>
                  <i className="fas fa-map-marker-alt mr-2 mt-4"></i> Address
                </p>
                <p className='ml-3'>
                  <i className="fas fa-clock mr-2 mt-4 mb-3"></i> 09:00-18:00
                </p>
              </div>
            </div>
          </Col>
        </Row>
        <div className="button-container mt-2 mb-4">
          <Button type="submit" className="contact-submit-btn">
            Send Message
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
