
import React from 'react';
import "../../styles/become-driver-section.css"
import { Container , Row , Col } from 'reactstrap';

import driverImg from "../../assets/all-images/mahindra-thar.webp" ;

const BecomeDriverSection = () => {
    return <section className="become__driver">
        <Container>
            <Row>
                <Col lg='6' md='6' sm='12' className='become__driver-img'> 
                  <img src={driverImg} alt="" className='w-100' />
                </Col>

                <Col lg='6' md='6' sm='12'> 
                    <h2 className="section__title become__driver-title">
                            Do You Want To Earn With Us? So Don't Be Late
                    </h2>

                    <button className="btn become__driver-btn mt-4">
                    Become A Driver
                    </button>
                </Col>
                
               
            </Row>
        </Container>
    </section>
};

export default BecomeDriverSection;