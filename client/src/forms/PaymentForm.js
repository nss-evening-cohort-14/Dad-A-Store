import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  Button, Form, FormGroup, Input, Label
} from 'reactstrap';
import { addPaymentType, updatePaymentType } from '../helpers/data/paymentTypesData';

const PaymentForm = ({
  formTitle,
  paymentID,
  paymentType,
  setPayments
}) => {
  const [paymentUpdate, setPaymentUpdate] = useState({
    paymentID: paymentID || null,
    paymentType: paymentType || ''
  });

  const handleInputChange = (e) => {
    setPaymentUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (paymentUpdate.paymentID !== null) {
      // console.warn(paymentUpdate); .paymentID, payment
      updatePaymentType(paymentUpdate).then(setPayments);
      // setPaymentUpdate(!paymentUpdate);
    } else {
      const newPaymentType = { paymentType: paymentUpdate.paymentType };
      addPaymentType(newPaymentType).then((response) => {
        setPaymentUpdate(response);
        history.push('/paymenttypes');
      });

      // Clears Input Fields
      setPaymentUpdate({
        // paymentID: null,
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
            defaultValue={paymentType}
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
  paymentID: PropTypes.any,
  paymentType: PropTypes.string,
  setPayments: PropTypes.func
};

export default PaymentForm;
