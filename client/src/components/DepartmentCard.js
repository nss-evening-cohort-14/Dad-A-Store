import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { deleteDepartment } from '../helpers/data/departmentsData';
import EditDepartmentForm from './EditDepartmentForm';

function DepartmentCard({
  departmentID,
  departmentName,
  departmentDescription,
  setDepartments,
  user,
}) {
  const [updating, setUpdating] = useState(false);
  const history = useHistory();

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteDepartment(departmentID)
          .then(setDepartments);
        history.push('/departments');
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        console.warn(departmentID);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  const DeptCard = styled.div`
  display: flex;
  flex-flow: row-wrap;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
  align-self: auto;
  flex-basis: 20em;
  margin: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 10px;
  border: 6px ridge darkgrey;
`;

  return (
    <DeptCard>
      <Card className='department-cards p-2'>
          <CardBody>
              <CardTitle tag="h3">Department: {departmentName}</CardTitle>
              <CardText>Department Description: {departmentDescription}</CardText>
              <CardText>Department ID: {departmentID}</CardText>
              <CardText>User: {user.uid}</CardText>
          </CardBody>
          <Button className="btn-md mr-2 ml-2 mt-2" color="danger" onClick={() => handleClick('delete')}>DELETE DEPARTMENT</Button>
          <Button className="btn-md mr-2 ml-2 mt-2" color="primary" onClick={() => handleClick('update')}>
          {updating ? 'CLOSE FORM' : 'EDIT DEPARTMENT'}
          </Button>
          {
            updating && <EditDepartmentForm
            formTitle='Edit Department'
            setDepartments={setDepartments}
            departmentID={departmentID}
            departmentName={departmentName}
            departmentDescription={departmentDescription}
            />
          }
      </Card>
    </DeptCard>
  );
}

DepartmentCard.propTypes = {
  departmentID: PropTypes.any.isRequired,
  departmentName: PropTypes.any.isRequired,
  departmentDescription: PropTypes.any.isRequired,
  user: PropTypes.any.isRequired,
  setDepartments: PropTypes.func,
};

export default DepartmentCard;