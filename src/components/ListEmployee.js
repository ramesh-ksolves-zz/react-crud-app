import React, { useEffect, useState } from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { API, graphqlOperation } from 'aws-amplify';
import { listEmployees } from '../graphql/queries'
import { deleteEmployee } from '../graphql/mutations'
import { Link, Route } from 'react-router-dom';
import { Grid, IconButton, makeStyles, Paper, TableContainer } from '@material-ui/core';
import ConfirmDialog from './ConfirmDialog';
import Button from '../components/Button'
import { withApollo } from 'react-apollo';
import { Mutation } from 'react-apollo'
import gql from "graphql-tag"
import Loader from './Loader';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHeader: {
        backgroundColor: '#f2f2f2',
        fontWeight: 'bold'
    }
});

const ListEmployee = (props) => {
    const classes = useStyles();
    const [employees, setEmployees] = useState([]);
    const [isconfirmDialogOpen, setIsconfirmDialogOpen] = useState(false);
    const [empDelId, setEmpDelId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const hideLoader = () => { setIsLoading(false) }
    const showLoader = () => { setIsLoading(true) }
    const addNewEmployee = () => {
        props.history.push("/employee/add")
    }
    const setConfirmOpen = (val, id) => {
        setIsconfirmDialogOpen(val)
        setEmpDelId(id)
    }

    useEffect(() => {
        fetchEmployeeList()
    }, [])


    async function fetchEmployeeList() {
        try {
            // const employeeList = await API.graphql(graphqlOperation(listEmployees))
            // setEmployees(employeeList.data.listEmployees.items);

            //Followed approach of React Apollo GraphQL query as   though above approach is simple one with aws appsync
            showLoader();
            const EMPLOYEE_LIST = gql`
                {
                  listEmployees {
                      items {
                        id
                        firstname
                        lastname
                        skills {
                          items {
                            name
                          }
                        }
                      }
                  }
               }`;

            return props.client.query({
                query: EMPLOYEE_LIST,
                fetchPolicy: 'network-only',
                variables: {}
            })
                .then((res) => {
                    setEmployees(res.data.listEmployees.items)
                    hideLoader()
                })
                .catch(console.error);
        }
        catch (err) {
            console.log('error fetching data...');
        }
    }
    async function removeEmployee(id) {
        try {
            // await API.graphql(graphqlOperation(deleteEmployee, { input: { id: id } }))
            // .then(setEmployees(employees.filter(emp => emp.id !== id)))
            // setEmpDelId('')

            //Followed approach of React Apollo GraphQL query as   though above approach is simple one with aws appsync
            const mutation = gql`
            mutation DeleteEmployee($input: DeleteEmployeeInput!) {
                deleteEmployee(input: $input) {
                    id
                }
            }`;
            return props.client.mutate({
                variables: { input: { id: id } },
                mutation
            })
                .then((result) => {
                    setEmployees(employees.filter(emp => emp.id !== id))
                    setEmpDelId('')
                })
                .catch((error) => { console.log(error); });
        }
        catch (err) {
            console.log('error removing employee...');
        }
    }
    
    return (
        <div className='wrapper'>
            <Typography variant="h4" align="center">Employee List</Typography>
            <Grid container justify="flex-end">
                <Button
                    type="secondary"
                    label="Add Employee"
                    handleClick={() => addNewEmployee()}
                />
            </Grid>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead >
                        <TableRow className={classes.tableHeader}>
                            <TableCell className={classes.tableHeader}>#ID</TableCell>
                            <TableCell align="left" className={classes.tableHeader}>First Name</TableCell>
                            <TableCell align="left" className={classes.tableHeader}>Last Name</TableCell>
                            <TableCell align="left" className={classes.tableHeader}>Skills</TableCell>
                            <TableCell align="center" colSpan="2" className={classes.tableHeader}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((emp, index) => (
                            <TableRow key={emp.id}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="left">{emp.firstname}</TableCell>
                                <TableCell align="left">{emp.lastname}</TableCell>
                                <TableCell align="left">
                                    {
                                        emp.skills.items.map((skill) => (skill.name)).join(', ')
                                    }
                                </TableCell>
                                <TableCell align="center" >
                                    <IconButton>
                                        <Link to={`/employee/${emp.id}`}><CreateIcon /></Link>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => setConfirmOpen(true, emp.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <ConfirmDialog
                                        title="Delete Employee?"
                                        open={isconfirmDialogOpen}
                                        setOpen={setConfirmOpen}
                                        onConfirm={() => removeEmployee(empDelId)}
                                    >
                                        Are you sure you want to delete this employee?
                                </ConfirmDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {(isLoading) ? <Loader /> : null}

        </div>
    )
}

export default withApollo(ListEmployee)