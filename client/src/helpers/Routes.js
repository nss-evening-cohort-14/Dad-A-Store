import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Orders from '../views/Orders';
import ItemsView from '../views/ItemsView';
import Cart from '../views/Cart';
import Payments from '../views/PaymentTypes';
import ItemsFormView from '../views/ItemsFormsView';
import Checkout from '../views/Checkout';
import MyOrders from '../views/MyOrders';

const PrivateRoute = ({
  component: Component,
  user,
  registeredUser,
  ...rest
}) => {
  const routeChecker = (attributes) => ((user && registeredUser)
    ? (<Component {...attributes} user={user} registeredUser={registeredUser} />)
    : (<Redirect to={{ pathname: '/', state: { from: attributes.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  user: PropTypes.any,
  registeredUser: PropTypes.bool
};
function Routes({
  user,
  orders,
  items,
  payments,
  setPayments,
  registeredUser,
  userFromDB,
  setItems
}) {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={() => <Home
        user={user}
        registeredUser={registeredUser}
        userFromDB={userFromDB}
         />} />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        userFromDB={userFromDB}
        path='/orders'
        component={() => <Orders
          user={user}
          orders={orders}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        userFromDB={userFromDB}
        path='/items'
        component={() => <ItemsView
          user={user}
          items={items}
          setItems={setItems}
          userFromDB={userFromDB}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        path='/itemsForms'
        component={() => <ItemsFormView
          user={user}
          setItems={setItems}
          userFromDB={userFromDB}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        userFromDB={userFromDB}
        path='/paymenttypes'
        component={() => <Payments
          user={user}
          payments={payments}
          setPayments={setPayments}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        path='/cart'
        component={() => <Cart
        userFromDB={userFromDB}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        path='/checkout'
        component={() => <Checkout
        userFromDB={userFromDB}
        />}
        />
        <PrivateRoute
        user={user}
        registeredUser={registeredUser}
        path='/myorders'
        component={() => <MyOrders
        userFromDB={userFromDB}
        />}
        />
      </Switch>
    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.any,
  orders: PropTypes.array.isRequired,
  items: PropTypes.array.isRequired,
  payments: PropTypes.array.isRequired,
  setPayments: PropTypes.func.isRequired,
  registeredUser: PropTypes.bool.isRequired,
  userFromDB: PropTypes.any,
  setItems: PropTypes.func.isRequired
};

export default Routes;
