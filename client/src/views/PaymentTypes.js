import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import PaymentTypeCard from '../components/PaymentCard';
import PaymentForm from '../forms/PaymentForm';

export default function Payments({
  user, payments, setPayments
}) {
  const [showAddPayment, setAddPayment] = useState(false);

  const handleClick = () => {
    setAddPayment((prevState) => !prevState);
  };

  return (
    <div className="paymentView">
      <div className="card-container">
      <br />

    <div>
    {!showAddPayment
      ? <Button className="addPayBtn" onClick={handleClick}>Add Payment</Button>
      : <div>
            <Button className="closeForm" onClick={handleClick}>Close Form</Button>
            <PaymentForm
              setPayments={setPayments}
              user={user}
            />
        </div>
    }
    </div>
      <h2>Payment Type Info for {user.userName}</h2>
      {
        payments.map((paymentInfo) => (
          <PaymentTypeCard
          Key={paymentInfo.paymentID}
          firebaseKey={paymentInfo.firebaseKey}
          paymentID={paymentInfo.paymentID}
          paymentType={paymentInfo.paymentType}
          setPayments={setPayments}
          user={user}
          />
        ))}
      </div>
    </div>
  );
}

Payments.propTypes = {
  user: PropTypes.any,
  payments: PropTypes.array.isRequired,
  setPayments: PropTypes.func
};
