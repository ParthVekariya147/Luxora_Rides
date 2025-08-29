import React, { useState, useEffect } from 'react';

import { Container , Row , Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/UI/BookingForm';
import PaymentMethod from '../components/UI/PaymentMethod';
import { getCarById } from '../api/index';


const CarDetails = () => {

    const { carId } = useParams();
    const [singleCarItem, setSingleCarItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await getCarById(carId);
                console.log('API Response:', response); // Debug માટે
                
                // તમારા API structure અનુસાર data extract કરો
                let carData = null;
                
                if (response && typeof response === 'object') {
                    // પહેલા response.data ચેક કરો (તમારા API structure અનુસાર)
                    if (response.success && response.data) {
                        carData = response.data;
                    } else if (response.data) {
                        carData = response.data;
                    } else {
                        // Fallback to direct response or other paths
                        carData = response.car || response;
                    }
                }
                
                setSingleCarItem(carData);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching car details:", err);
                setError(err.message);
                setLoading(false);
            }
        };

        if (carId) {
            fetchCarDetails();
        }
        window.scrollTo(0, 0);
    }, [carId]);

    if (loading) {
        return <Helmet title="Loading..." >
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="text-center mt-5">
                                <h4>Loading car details...</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>;
    }

    if (error) {
        return <Helmet title="Error" >
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="text-center mt-5">
                                <h4>Error: {error}</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>;
    }

    // Show message if car not found
    if (!singleCarItem) {
        return <Helmet title="Car Not Found" >
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <div className="text-center mt-5">
                                <h4>Car not found</h4>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>;
    }

    return <Helmet title={singleCarItem.car_name} >
        <section>
            <Container>
                <Row>
                    <Col lg='6'>
                        <img src={singleCarItem.image_url} alt={singleCarItem.car_name} className='w-100' />
                    </Col>

                    <Col lg='6'>
                        <div className="car__info">
                            <h2 className='section__title'>{singleCarItem.car_name}</h2>

                            <div className="d-flex align-items-center gap-5 mb-4 mt-3">
                                    <h6 className="rent__price fw-bold fs-4">
                                          ₹{singleCarItem.price_per_day}.00 / Day
                                    </h6>
                                    
                                    <span className='d-flex align-items-center gap-2'>
                                        <span style={{color:"#f9a826"}}>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                            <i className="ri-star-s-fill"></i>
                                        </span>

                                        ({singleCarItem.ratings || singleCarItem.average_rating} ratings)
                                    </span>

                            </div>

                            <p className="section__description">
                                {singleCarItem.description}
                            </p>

                            <div className="mt-3 d-flex flex-column gap-3">
                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-roadster-line text-warning"></i> {singleCarItem.year_model}
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-settings-2-line text-warning"></i> {singleCarItem.technical_specifications?.transmission || 'N/A'}
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-timer-flash-line text-warning"></i> {singleCarItem.technical_specifications?.top_speed_kmh || 'N/A'} km/h
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-map-pin-2-line text-warning"></i> {singleCarItem.location?.city || 'N/A'}, {singleCarItem.location?.state || 'N/A'}
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-wheelchair-line text-warning"></i> {singleCarItem.dimensions?.seating_capacity || 'N/A'} Seater
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-building-2-line text-warning"></i> {singleCarItem.brand}
                                </span>

                                {/* Additional technical specifications */}
                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-gas-station-line text-warning"></i> {singleCarItem.technical_specifications?.engine_details || 'N/A'}
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-flashlight-line text-warning"></i> {singleCarItem.technical_specifications?.combined_horsepower || 'N/A'} HP
                                </span>

                                <span className="d-flex align-items-center gap-2 section__description">
                                    <i className="ri-shield-check-line text-warning"></i> {singleCarItem.safety_and_assistance?.ncap_rating || 'N/A'}
                                </span>
                            </div>

                        </div>
                    </Col>


                    <Col lg="7" className='mt-5'>
                        <div className="booking-info mt-5">
                            <h5 className='mb-4 fw-bold'>Booking Information</h5>
                            
                            {/* Rental Details Display */}
                            {singleCarItem.rental_details && (
                                <div className="rental-details mb-4 p-3 border rounded">
                                    <h6 className="fw-bold mb-3">Rental Details</h6>
                                    <div className="d-flex flex-column gap-2">
                                        <span><strong>Security Deposit:</strong> ₹{singleCarItem.rental_details.security_deposit_inr}</span>
                                        <span><strong>Daily Kilometers Included:</strong> {singleCarItem.rental_details.kilometers_included_per_day} km</span>
                                        <span><strong>Extra KM Charge:</strong> ₹{singleCarItem.rental_details.extra_km_charge_per_unit_inr}/km</span>
                                        <span><strong>Insurance:</strong> {singleCarItem.rental_details.insurance_included ? 'Included' : 'Not Included'}</span>
                                    </div>
                                </div>
                            )}

                            <BookingForm carData={singleCarItem}></BookingForm>
                        </div>
                    </Col>

                    {/* <Col lg="5" className='mt-5'>
                        <div className="payment__info mt-5">
                            <h5 className='mb-4 fw-bold'>Payment Information</h5>

                            <PaymentMethod carData={singleCarItem}></PaymentMethod>
                        </div>
                    </Col> */}

                    
                </Row>
            </Container>
        </section>
    </Helmet>
};

export default CarDetails;