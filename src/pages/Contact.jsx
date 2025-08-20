import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import { Link } from "react-router-dom";
import { Mail, Phone, User, MessageSquare } from "lucide-react"; // icons

import "../styles/contact.css";

const socialLinks = [
  {
    url: "https://www.facebook.com/",
    icon: "ri-facebook-line",
  },
  {
    url: "https://www.instagram.com/",
    icon: "ri-instagram-line",
  },
  {
    url: "https://github.com/",
    icon: "ri-github-fill",
  },
  {
    url: "https://www.linkedin.com/",
    icon: "ri-linkedin-line",
  },
];

const Contact = () => {
  return (
    <Helmet title="Contact">
      <CommonSection title="Contact" />
      <section>
        <Container className="mt-5 mb-5">
          <Row>
            {/* Contact Form */}
            <Col lg="7" md="7">
              <div className="form-card contact-card">
                <h2 className="form-title">Get In Touch</h2>

                <Form>
                  <FormGroup className="contact__form">
                    <div className="input-group">
                      <User className="input-icon" />
                      <input type="text" placeholder="Your Name" />
                    </div>
                  </FormGroup>

                  <FormGroup className="contact__form">
                    <div className="input-group">
                      <Mail className="input-icon" />
                      <input type="email" placeholder="Email" />
                    </div>
                  </FormGroup>

                  <FormGroup className="contact__form">
                    <div className="input-group textarea-group">
                      <MessageSquare className="input-icon" />
                      <textarea
                        rows="4"
                        className="textarea"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                  </FormGroup>

                  <button className="form-btn" type="submit">
                    Send Message
                  </button>
                </Form>
              </div>
            </Col>

            {/* Contact Information */}
            <Col lg="5" md="5">
              <div className="form-card contact-info">
                <h2 className="form-title">Contact Information</h2>
                <p className="info-text">
                  A-101, Rajhans Realty, Dumas Road, near Airport, Surat, Gujarat
                  395007
                </p>

                <div className="info-item">
                  <Phone size={18} /> <span>+91 1234567890</span>
                </div>

                <div className="info-item">
                  <Mail size={18} /> <span>luxora.rides@gmail.com</span>
                </div>

                <h6 className="fw-bold mt-4">Follow Us</h6>
                <div className="d-flex align-items-center gap-4 mt-3">
                  {socialLinks.map((item, index) => (
                    <Link
                      to={item.url}
                      key={index}
                      className="social__link-icon"
                      target="_blank"
                    >
                      <i className={item.icon}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Contact;
