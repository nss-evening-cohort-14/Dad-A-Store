import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import CategoryCard from '../components/CategoryCard';
import CategoryForm from '../forms/CategoryForm';

const CatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: 10px;
  margin: 10px;
  z-index: -1;
  `;

export default function Categories({
  user, categories, setCategories
}) {
  const [showAddCategory, setAddCategory] = useState(false);

  const handleClick = () => {
    setAddCategory((prevState) => !prevState);
  };

  return (
    <div className="categoriesView">
    <div className="card-container">
    <br />
        <div>
        {!showAddCategory
          ? <Button className="addCategoryBtn" onClick={handleClick}>Add Category</Button>
          : <div>
            <Button className="closeForm" onClick={handleClick}>Close Form</Button>
            <CategoryForm
            setAddCategory={setAddCategory}
              setCategories={setCategories}
              user={user}
            />
        </div>
    }
    </div>
    <CatContainer className="categories-container align-content-center" id="categories-container">
          {
        categories.map((categoryInfo) => (
          <CategoryCard
          key={categoryInfo.categoryID + categoryInfo.departmentID}
          categoryID={categoryInfo.categoryID}
          categoryName={categoryInfo.categoryName}
          categoryDescription={categoryInfo.categoryDescription}
          departmentID={categoryInfo.departmentID}
          departmentName={categoryInfo.departmentName}
          user={user}
          setCategories={setCategories}
          />
        ))
      }
      </CatContainer>
    </div>
    </div>
  );
}

Categories.propTypes = {
  user: PropTypes.any,
  categories: PropTypes.array.isRequired,
  setCategories: PropTypes.any
};
