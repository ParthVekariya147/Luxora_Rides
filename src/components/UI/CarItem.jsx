import React from "react";
import "../../styles/car-item.css";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";

const CarItem = (props) => {
  const {
    image_url,
    year_model,
    car_name,
    technical_specifications,
    price_per_day,
    _id,
  } = props.item || {};

  // Safely extract values with fallbacks
  const transmission = technical_specifications?.transmission || "N/A";
  const topSpeed = technical_specifications?.top_speed_kmh || "N/A";

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img
            src={image_url}
            alt={car_name || "Car"}
            className="w-100"
            onError={(e) => {
              e.target.src = "https://placehold.co/600x400?text=Car+Image";
            }}
          />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">
            {" "}
            {car_name || "Unknown Car"}{" "}
          </h4>
          <h6 className="rent__price text-center mt-2">
            {" "}
            ₹{price_per_day || 0}.00 <span>/ Day</span>{" "}
          </h6>

          <div className="car__item-info align-items-center justify-content-between mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i class="ri-roadster-line"></i> {year_model || "N/A"}
            </span>

            <span className="d-flex align-items-center gap-1">
              <i class="ri-settings-5-line"></i> {transmission}
            </span>

            <span className="d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {topSpeed} km/h
            </span>
          </div>

          <button
            className="car__item-btn car__btn-rent w-50"
            onClick={() => {
              localStorage.setItem("rentedCarId", _id);
            }}
          >
            <Link to={`/cars/${_id || "unknown"}`}> Rent </Link>
          </button>

          <button className="car__item-btn car__btn-details w-50"
                onClick={() => {
              localStorage.setItem("rentedCarId", _id);
            }}
          >
            <Link to={`/cars/${_id || "unknown"}`}> More Info </Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
