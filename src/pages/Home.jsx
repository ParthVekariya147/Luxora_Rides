import React, { useState, useEffect } from 'react';
import { Container , Row , Col } from 'reactstrap';

import Helmet from '../components/Helmet/Helmet';
import AboutSection from '../components/UI/AboutSection';
import FindCarForm from '../components/UI/FindCarForm';
import HeroSlider from '../components/UI/HeroSlider';
import ServicesList from '../components/UI/ServicesList';

import CarItem from '../components/UI/CarItem';
import BecomeDriverSection from '../components/UI/BecomeDriverSection';
import BlogList from '../components/UI/BlogList';
import { getFeaturedCars } from '../api/index';


const Home = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeaturedCars = async () => {
            try {
                const response = await getFeaturedCars();
                // Check if response is an array, if not, try to extract cars array from response
                const carsData = Array.isArray(response) ? response : (response.cars || response.data || []);
                setCars(carsData);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchFeaturedCars();
    }, []);

    return <Helmet title='Home'>

    {/* ============== HERO SECTION ============== */}

        <section className="p-0 hero__slider-section">
           <HeroSlider></HeroSlider>
       

        <div className="hero__form">
            <Container>
                <Row className="form__row">
                    <Col lg='4' md='4'>
                        <div className="find__cars-left">
                            <h2>Find Your Best Car Here</h2>

                        </div>
                    </Col>

                    <Col lg='8' md='8' sm='12'>
                        <FindCarForm></FindCarForm>
                    </Col>
                </Row>
            </Container>
        </div>
    </section>


    {/* ============== ABOUT SECTION ============== */}

    <AboutSection></AboutSection>

    {/* ============== Services SECTION ============== */}

    <section>
        <Container>
            <Row>
                <Col lg='12' className='mb-5 text-center'>
                    <h6 className="section__subtitle"> See Our </h6>
                    <h2 className="section__title">Popular Services</h2>
                </Col>

                <ServicesList></ServicesList>
            </Row>
        </Container>
    </section>

    {/* ============== CAR OFFER SECTION ============== */}

    <section>
        <Container>
            <Row>
                <Col lg='12' className='mb-5 mt-5 text-center'>
                    <h6 className="section__subtitle">Come With</h6>
                    <h2 className="section__title"> Special Offers</h2>
                </Col>

                {
                    loading ? (
                        <Col lg='12'>
                            <div className="text-center mt-5">
                                <h4>Loading featured cars...</h4>
                            </div>
                        </Col>
                    ) : error ? (
                        <Col lg='12'>
                            <div className="text-center mt-5">
                                <h4>Error: {error}</h4>
                            </div>
                        </Col>
                    ) : (
                        cars.slice(0, 9).map((item) => (
                            <CarItem item={item} key={item._id} />
                        ))
                    )
                }

            </Row>
        </Container>
    </section>

    {/* ============== BECOME A DRIVER SECTION ============== */}

    <BecomeDriverSection></BecomeDriverSection>



    {/* ============== BLOG LIST SECTION ============== */}

    <section>
        <Container>
            <Row>
                <Col lg='12' className='mb-1 mt-5 text-center'>
                    <h6 className="section__subtitle">Explore Our Blogs</h6>
                    <h2 className="section__title">Latest Blogs</h2>
                </Col>

                <BlogList></BlogList>
            </Row>
        </Container>
    </section>


    </Helmet>
};

export default Home;