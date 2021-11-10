import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import Orders from '../views/Orders';
import ItemsView from '../views/ItemsView';
<<<<<<< HEAD
import Categories from '../views/Categories';
=======
import Payments from '../views/PaymentTypes';
<<<<<<< HEAD
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
=======
import ItemsFormView from '../views/ItemsFormsView';
>>>>>>> 5abb8935e27baad712b9f4ce3d3604fc6a589ee2

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
<<<<<<< HEAD
  categories,
=======
  payments,
  setPayments,
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
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
<<<<<<< HEAD
        path='/categories'
        component={() => <Categories
          user={user}
          categories={categories}
          registeredUser={registeredUser}
=======
        path='/paymenttypes'
        component={() => <Payments
          user={user}
          payments={payments}
          setPayments={setPayments}
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
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
<<<<<<< HEAD
  categories: PropTypes.array.isRequired,
=======
  payments: PropTypes.array.isRequired,
  setPayments: PropTypes.func.isRequired,
>>>>>>> e8855fdb5f70070d61968e8e6e189fc50b5dee3d
  registeredUser: PropTypes.bool.isRequired,
  userFromDB: PropTypes.any,
  setItems: PropTypes.func.isRequired
};

export default Routes;
