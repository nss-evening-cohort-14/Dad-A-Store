import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button, FormGroup, Input, Label
} from 'reactstrap';
import styled from 'styled-components';
import { addCategory, updateCategory } from '../helpers/data/categoriesData';

const StyledCategoryForm = styled.div`
  border: 3px;
  border-bottom-style: double;
  border-color: #2F8F20;
  background-color: lightGrey;
  display: inline-block;
  align-items: center;
  text-align: center;
  margin: 10px;
  justify-content: space-between;
  padding: 20px;
  width: 450px;
  justify-items: center;
  `;

const CategoryForm = ({
  formTitle,
  categoryID,
  categoryName,
  categoryDescription,
  departmentID,
  departmentName,
  setCategories
}) => {
  // Sets the Category State being Submitted for add or edit
  const [category, setCategory] = useState({
    categoryID: categoryID || null,
    categoryName: categoryName || '',
    categoryDescription: categoryDescription || '',
    departmentID: departmentID || '',
    departmentName: departmentName || ''
  });

  const handleInputChange = (e) => {
    setCategory((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category.categoryID !== null) {
      updateCategory(category).then(setCategories);
    } else {
      // const newCategory = ({
      //   categoryName: category.categoryName,
      //   categoryDescription: category.categoryDescription,
      //   departmentID: category.departmentID,
      //   // departmentName: categoryUpdate.departmentName
      // });
      addCategory(category).then((response) => {
        setCategories(response);
      });

      // Clears Input Fields
      setCategory({
        categoryName: '',
        categoryDescription: '',
        departmentName: ''
      });
    }
  };

  return (
    <div className='category-form'>
      <StyledCategoryForm
        id='addCategoryForm'
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <FormGroup>
          <Label for="category">Category Name: </Label>
          <Input
            name='categoryName'
            id='categoryName'
            defaultValue={categoryName}
            type='text'
            placeholder='Enter Category'
            required
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Category Description: </Label>
          <Input
            name='categoryDescription'
            id='categoryDescription'
            defaultValue={categoryDescription}
            type='text'
            placeholder='Enter Description'
            required
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="category">Department Name: </Label>
          <Input
            name='departmentName'
            id='departmentName'
            defaultValue={departmentName}
            type='text'
            placeholder='Enter Department'
            required
            onChange={handleInputChange}
          />
        </FormGroup>
        <Button type='submit'>Submit</Button>
        </StyledCategoryForm >
    </div>
  );
};

CategoryForm.propTypes = {
  formTitle: PropTypes.string,
  categoryID: PropTypes.any,
  categoryName: PropTypes.string,
  categoryDescription: PropTypes.string,
  departmentID: PropTypes.any,
  departmentName: PropTypes.any,
  setCategories: PropTypes.func
};

export default CategoryForm;
