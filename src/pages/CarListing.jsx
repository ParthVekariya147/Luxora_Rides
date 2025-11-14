import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import { listCars } from "../api/index";
import carData from "../assets/data/carData";

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [originalCars, setOriginalCars] = useState([]); // Original data store કરવા માટે
  const [sortBy, setSortBy] = useState(""); // Sort option track કરવા માટે
  console.log("CarListing.jsx / cars / 10 -------------------  ", cars);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await listCars();
        console.log("API Response:", response); // Debug માટે

        // More robust check to ensure we have an array
        let carsData = [];
        if (Array.isArray(response)) {
          carsData = response;
        } else if (response && typeof response === "object") {
          // તમારા API structure અનુસાર પહેલા data.cars ચેક કરો
          if (response.data && Array.isArray(response.data.cars)) {
            carsData = response.data.cars;
          } else if (
            response.success &&
            response.data &&
            Array.isArray(response.data.cars)
          ) {
            carsData = response.data.cars;
          } else {
            // Fallback to other possible paths
            carsData = response.cars || response.data || response.items || [];
          }
        }

        // Ensure carsData is an array
        if (!Array.isArray(carsData)) {
          carsData = [];
        }

        setCars(carsData);
        setOriginalCars(carsData); // Original data store કરો
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        // Fallback to local data if API fails
        setCars(carData);
        setOriginalCars(carData); // Original data store કરો
        setError("Failed to load cars from server. Showing local data.");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Sort functionality
  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    setSortBy(sortValue);

    let sortedCars = [...originalCars];

    switch (sortValue) {
      case "low":
        // Price: Low to High
        sortedCars.sort((a, b) => a.price_per_day - b.price_per_day);
        break;
      case "high":
        // Price: High to Low
        sortedCars.sort((a, b) => b.price_per_day - a.price_per_day);
        break;
      case "rating":
        // Rating: High to Low
        sortedCars.sort(
          (a, b) =>
            (b.ratings || b.average_rating || 0) -
            (a.ratings || a.average_rating || 0)
        );
        break;
      case "name":
        // Car Name: A to Z
        sortedCars.sort((a, b) => a.car_name.localeCompare(b.car_name));
        break;
      case "year":
        // Year: Newest to Oldest
        sortedCars.sort((a, b) => b.year_model - a.year_model);
        break;
      default:
        // Reset to original order
        sortedCars = [...originalCars];
        break;
    }

    setCars(sortedCars);
  };

  if (loading) {
    return (
      <Helmet>
        <CommonSection title="Car Listing"></CommonSection>
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="text-center mt-5">
                  <h4>Loading cars...</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }

  if (error) {
    return (
      <Helmet>
        <CommonSection title="Car Listing"></CommonSection>
        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className="text-center mt-5">
                  <h4>Error: {error}</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    );
  }

  return (
    <Helmet>
      <CommonSection title="Car Listing"></CommonSection>

      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="d-flex align-items-center gap-3 mb-5 mt-5">
                <span className="d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="form-select"
                  style={{ width: "auto" }}
                >
                  <option value="">Select</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                  <option value="rating">Rating: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="year">Year: Newest First</option>
                </select>

                {/* Clear sort button */}
                {sortBy && (
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      setSortBy("");
                      setCars([...originalCars]);
                    }}
                  >
                    <i className="ri-refresh-line"></i> Clear Sort
                  </button>
                )}

                {/* Cars count display */}
                <span className="text-muted ms-auto">
                  {cars.length} car{cars.length !== 1 ? "s" : ""} found
                </span>
              </div>
            </Col>

            {Array.isArray(cars) && cars.length > 0 ? (
              cars.map((item) => (
                <CarItem item={item} key={item.id || item._id} />
              ))
            ) : (
              <Col lg="12">
                <div className="text-center mt-5">
                  <h4>No cars available at the moment</h4>
                  <p>Please check back later</p>
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarListing;
