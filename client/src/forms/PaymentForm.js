import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { addPaymentType, updatePaymentType } from '../helpers/data/paymentTypesData';

const PaymentForm = ({
  formTitle,
  paymentType,
  setPayments
}) => {
  const [payment, setPayment] = useState({
    paymentType: paymentType || ''
  });

  const handleInputChange = (e) => {
    setPayment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (payment.paymentID) {
      // console.warn(payment); .paymentID, payment
      updatePaymentType(payment)
      //   .then((resp) => setPayments(resp));
      // setPayment(!payment);
        .then(setPayments);
    } else {
      addPaymentType(payment)
        .then((Response) => {
          setPayments(Response);
          history.push('/paymenttypes');
        });

      // Clears Input Fields
      setPayment({
        paymentType: ''
      });
    }
  };

  return (
    <div className='payment-form'>
      <Form
        id='addPaymentForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>

        <FormGroup>
          <Label for="paymentType">Payment Type: </Label>
          <Input
            name='paymentType'
            id='paymentType'
            value={payment.paymentType}
            type='text'
            placeholder='Enter Payment Type'
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
        </Form>
    </div>
  );
};

PaymentForm.propTypes = {
  formTitle: PropTypes.string,
  paymentType: PropTypes.string,
  setPayments: PropTypes.func
};

export default PaymentForm;