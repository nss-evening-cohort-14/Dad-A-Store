import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../components/ItemCard';

function Items({
  user, items, setItems, userFromDB
}) {
  return (
    <div>
      <h3> Items Info for {user.userName} </h3>
      {
        items.map((itemInfo) => (
          <ItemCard
          Key={itemInfo.itemID}
          itemID={itemInfo.itemID}
          itemName={itemInfo.itemName}
          itemDescription={itemInfo.itemDescription}
          itemPrice={itemInfo.itemPrice}
          categoryID={itemInfo.categoryID}
          sellerID={itemInfo.sellerID}
          categoryName={itemInfo.categoryName}
          sellerFirstName={itemInfo.sellerFirstName}
          sellerLastName={itemInfo.sellerLastName}
          user={user}
          setItems={setItems}
          userFromDB={userFromDB}
          />
        ))
      }
    </div>
  );
}

Items.propTypes = {
  user: PropTypes.any,
  items: PropTypes.array.isRequired,
  setItems: PropTypes.any.isRequired,
  userFromDB: PropTypes.any.isRequired
};

export default Items;
