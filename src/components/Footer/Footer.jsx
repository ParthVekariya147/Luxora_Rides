import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import "../../styles/Footer.css"

// Array of quick links for the footer
const quickLinks = [
    {
        path: '/about',
        display: 'About'
    },
    {
        path: '#',
        display: 'Privacy Policy'
    },
    {
        path: '/cars',
        display: 'Car Listing'
    },
    {
        path: '/blogs',
        display: 'Blog'
    },
    {
        path: '/contact',
        display: 'Contact'
    }
]

const Footer = () => {
    // Get current year for copyright
    const date = new Date()
    const year = date.getFullYear() 

    return (
        <footer className="footer">
            <Container>
                <Row>
                    {/* Logo and description column */}
                    <Col lg='4' md='4' sm='12'>
                        <div className="logo footer__logo">
                            <h1>
                                <Link to='/home' className='d-flex align-items-center gap-3'>
                                    <i class="ri-car-line"></i>
                                    <span>Rent Car <br /> Service</span>
                                </Link>
                            </h1>
                        </div>
                        <p className="footer__logo-content">
                            Rent Car Service is a service which provides you with best cars to Rent for Hours/Days wise. We're the first to give this types of service in Indore. Soon we'll Upgrade more features in our service. Till then Stay connected and enjoy the rides. 
                        </p>
                    </Col>

                    {/* Quick Links column */}
                    <Col lg='2' md='4' sm='6'>
                        <div className='mb-4'>
                            <h5 className="footer__link-title">Quick Links</h5>
                            <ListGroup>
                                {quickLinks.map((item, index) => (
                                    <ListGroupItem key={index} className='p-0 mt-3 quick__link'>
                                        <Link to={item.path}> 
                                            {item.display}
                                        </Link>
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>

                    {/* Head Office information column */}
                    <Col lg='3' md='4' sm='6'>
                        <div className="mb-4">
                            <h5 className="footer__link-title mb-4">Head Office</h5>
                            <p className="office__info">
                                101, Apollo Premier Building, Vijay Nagar Square, surat 395010
                            </p>
                            <p className="office__info">Phone: +91 1234567890</p>
                            <p className="office__info">E-mail: abcdefghi123@gmail.com</p>
                            <p className="office__info">Office-Time: 09.00AM - 5:00PM [Monday-Friday]</p>
                        </div>
                    </Col>

                    {/* Newsletter subscription column */}
                    <Col lg='3' md='4' sm='12'>
                        <div className="mb-4">
                            <h5 className="footer__link-title">Newsletter</h5>
                            <p className="section__description">Subscribe our newsletter</p>
                            <div className="newsletter">
                                <input type="email" placeholder='Enter Your E-mail' />
                                <span><i class="ri-send-plane-line"></i></span>
                            </div>
                        </div>
                    </Col>

                    {/* Copyright information */}
                    <Col lg='12'>
                        <div className="footer__bottom">
                            <p className="section__description d-flex align-items-center justify-content-center gap-1 pt-4">
                                <i class="ri-copyright-line"></i> Copyright {year}, Developed By MasterMind. All Rights Reserved.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
