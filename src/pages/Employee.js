import { API, graphqlOperation } from 'aws-amplify'
import React, { useEffect, useState } from 'react'
import { getEmployee } from '../graphql/queries'
import { createEmployee, updateEmployee, createSkill, deleteSkill } from '../graphql/mutations'
import { useParams } from 'react-router-dom'
import Button from '../components/Button'
import FormInput from '../components/FormInput'
import { FormControl, FormHelperText, Input, InputLabel, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loader from '../components/Loader'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
    minWidth: 120,
    width: '100%',
  },
  noLabel: {
    marginTop: theme.spacing(3),
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'ReactJS',
  'AngularJS',
  'GraphQL',
  'AWS Amplify',
  'AWS DynamoDB',
  'Material UI',
  'AWS AppSync',
];

const Employee = (props) => {

  const classes = useStyles();
  const { empId } = useParams();
  const initialSkills = {
    name: ""
  }
  const initialStateEmp = {
    firstname: "",
    lastname: ""
  }

  const [formLabel, setFormLabel] = useState("Add New Employee");
  const [errors, setErrors] = useState({});
  const [employee, setEmployee] = useState(initialStateEmp);
  const [skills, setSkills] = useState([initialSkills]);
  const [prevSkills, setPrevSkills] = useState([]);
  const [touched, setTouched] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const skillChangeHandler = (event) => {
    const arrSkillsObj = [];
    event.target.value.forEach(element => {
      arrSkillsObj.push({ name: element });
    });
    setSelectedSkills(event.target.value);
    setSkills(arrSkillsObj);
    setTouched(true);
    // setEmployee({...employee, skills:arrSkillsObj})
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  }

  const backToListPage = () => {
    props.history.push('/employees');
  }

  useEffect(() => {
    if (empId) {
      setFormLabel("Update Employee Details");
      setIsLoading(true);
      getEmpDetails();
    } else {
      setIsLoading(false);
    }
  }, [])

  const getEmpDetails = async () => {
    try {
      const arrSkills = [];
      const empoyeeDeatils = await API.graphql(graphqlOperation(getEmployee, { id: empId }));
      setEmployee(empoyeeDeatils.data.getEmployee);
      empoyeeDeatils.data.getEmployee.skills.items.forEach(element => {
        arrSkills.push(element.name);
      });
      setSelectedSkills(arrSkills);
      setSkills(empoyeeDeatils.data.getEmployee.skills);
      setPrevSkills(empoyeeDeatils.data.getEmployee.skills);
      setIsLoading(false);
    } catch (err) {
      console.log('error fetching emp data');
    }
  }
  const validateAllFields = (event) => {
    event.preventDefault();
    let err = {};
    let errCount = 0;
    if (!employee.firstname) {
      err.firstname = "Enter first name";
      errCount++;
    }
    if (employee.firstname && employee.firstname.length > 30) {
      err.firstname = "First name must be less that 30 characters";
      errCount++;
    }

    if (!employee.lastname) {
      err.lastname = "Enter last name";
      errCount++;
    }

    if (employee.lastname && employee.lastname.length > 30) {
      err.lastname = "Last name must be less that 30 characters";
      errCount++;
    }

    if (selectedSkills.length === 0) {
      err.skills = "Please select atleast one skill";
      errCount++;
    }

    setErrors(err)

    if (errCount === 0) {
      saveEmployee();
    }
  }

  const saveEmployee = async (event) => {
    try {
      let res;
      setIsLoading(true);
      if (empId) {
        employee.id = empId;
        delete employee.skills;
        res = await API.graphql(graphqlOperation(updateEmployee, { input: employee }))
        if (touched) {
          // Delete old skills
          for (const prevSkill of prevSkills.items) {
            res = await API.graphql(graphqlOperation(deleteSkill, { input: { id: prevSkill.id } }));
          }
          //Insert new skill
          for (const skill of skills) {
            skill.empID = empId;
            res = await API.graphql(graphqlOperation(createSkill, { input: skill }));
          }
        }

      } else {
        res = await API.graphql(graphqlOperation(createEmployee, { input: employee }))
        if (res.data.createEmployee.id) {
          const newEmpId = res.data.createEmployee.id;
          for (const skill of skills) {
            skill.empID = newEmpId;
            res = await API.graphql(graphqlOperation(createSkill, { input: skill }));
          }
        }
      }
      setIsLoading(false);
      if (!res.data.errors) {
        props.history.push("/employees");
      }

    } catch (err) {
      console.log('error creating employee...');
    }
  }
  return (
    <div className='wrapper'>
      {(isLoading) ? <Loader /> : null}
      <div className='form-wrapper'>
        <form>
          <FormControl className={classes.formControl}>
            <Typography variant="h5" align="center">{formLabel}</Typography>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormInput
              label="First Name"
              name="firstname"
              type="text"
              value={employee.firstname}
              onChange={handleChange}
              placeholder="Enter First Name..."
              error={errors.firstname}
              required
              className={classes.input}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormInput
              label="Last Name"
              name="lastname"
              type="text"
              value={employee.lastname}
              onChange={handleChange}
              placeholder="Enter Last Name..."
              error={errors.lastname}
              required
              className={classes.input}
            />
          </FormControl>
          <FormControl className={classes.formControl} variant="outlined" error={errors.skills ? true : false}>
            <InputLabel id="mutiple-name-label">Select Skills</InputLabel>
            <Select
              labelId="mutiple-name-label"
              id="mutiple-name"
              multiple
              value={selectedSkills}
              onChange={skillChangeHandler}
              input={<Input />}
              variant="outlined"
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name} >
                  {name}
                </MenuItem>
              ))}
            </Select>
            {errors.skills && <FormHelperText>Please select skill</FormHelperText>}
          </FormControl>
          <FormControl className={classes.formControl}>
            <Button
              type="primary"
              label="Save"
              handleClick={validateAllFields}
            />
            <Button
              type="secondary"
              label="Cancel"
              handleClick={() => backToListPage()}
            />
          </FormControl>
        </form>
      </div>
    </div>
  )
}

export default Employee