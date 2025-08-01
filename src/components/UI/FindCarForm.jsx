import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../../styles/find-car-form.css";
import { Form, FormGroup } from 'reactstrap';
import "./CarItem";

const FindCarForm = () => {
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate("/cars"); 
  };

  return (
    <Form className='form' onSubmit={handleSubmit}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <FormGroup className='form__group'>
          <input type="text" placeholder='From Address' required />
        </FormGroup>

        <FormGroup className='form__group'>
          <input type="text" placeholder='To Address' required />
        </FormGroup>

        <FormGroup className='form__group'>
          <input type="date" placeholder='Journey Date' required />
        </FormGroup>

        <FormGroup className='form__group'>
          <input type="time" className='journey__time' placeholder='Journey Time' />
        </FormGroup>

        <FormGroup className='select__group'>
          <select>
            <option value="ac">AC Car</option>
            <option value="non-ac">Non-AC Car</option>
          </select>
        </FormGroup>

        <FormGroup className='form__group'>
          <button type="submit" className="btn find__car-btn">Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
