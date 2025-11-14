import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/find-car-form.css";
import { Form, FormGroup } from 'reactstrap';

const FindCarForm = () => {
  const navigate = useNavigate(); 
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // आज नी तारीख YYYY-MM-DD format मा convert
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    setMinDate(`${yyyy}-${mm}-${dd}`);
  }, []);

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
          <input 
            type="date" 
            placeholder='Journey Date' 
            required 
            min={minDate}   // ✅ past date block करी दी
          />
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
