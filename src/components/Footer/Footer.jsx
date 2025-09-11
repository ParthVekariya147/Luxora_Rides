import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import "../../styles/Footer.css";
import logo from "../../assets/all-images/logo.png";

const quickLinks = [
  { path: '/about', display: 'About' },
<<<<<<< HEAD
=======
  { path: '#', display: 'Privacy Policy' },
>>>>>>> e188a9cde8332765574c75e97f384e46edcfd986
  { path: '/cars', display: 'Car Listing' },
  { path: '/blogs', display: 'Blog' },
  { path: '/contact', display: 'Contact' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* Logo & About */}
          <Col lg="4" md="6" sm="12">
            <div className="footer__logo d-flex align-items-center gap-2 mb-3">
              <Link to="/home" className="d-flex align-items-center gap-2 text-decoration-none">
                <img src={logo} alt="Luxora Rides Logo" className="footer__logo-img" />
                <span className="footer__logo-text">Luxora_Rides</span>
              </Link>
            </div>
            <p className="footer__logo-content">
              Luxora_Rides provides premium cars for rent by hour or day.
              Gujarat’s first of its kind. Stay connected and enjoy the rides.
            </p>
          </Col>

          {/* Quick Links */}
          <Col lg="4" md="3" sm="6">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup>
              {quickLinks.map((item, index) => (
                <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          {/* Head Office */}
          <Col lg="4" md="3" sm="6">
            <h5 className="footer__link-title mb-4">Head Office</h5>
            <p className="office__info">A-101, Rajhans Realty, Dumas Road, Surat</p>
            <p className="office__info">Phone: +91 1234567890</p>
            <p className="office__info">Email: luxora.rides@gmail.com</p>
            <p className="office__info">Time: 09:00AM - 5:00PM [Mon - Fri]</p>
          </Col>

          {/* Newsletter Section - Bottom Centered */}
          <Col lg="12">
            <div className="footer__newsletter text-center">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe to our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Enter Your E-mail" />
                <span><i className="ri-send-plane-line"></i></span>
              </div>
            </div>
          </Col>

          {/* Copyright */}
          <Col lg="12">
            <div className="footer__bottom">
              <p className="section__description text-center mt-4">
                <i className="ri-copyright-line"></i>
                {year}, Developed By MasterMind. All Rights Reserved.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
