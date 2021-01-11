import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(surname, name, country, firstContact, email, sold, owner) {
  return { surname, name, country, firstContact, email, sold, owner};
}

// const rows = props.CRMStores.clients.map()


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


const Clients = inject("CRMStores")(observer((props) =>{
  console.log(props.CRMStores.clients[0]);
useEffect(() => {
props.CRMStores.getClients()
}, [Clients])


const rows = props.CRMStores.clients[0].map(c => {
  return (createData(
c.last, c.first, c.country, c.date, c.email, c.sold, c.owner))})


const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Surname</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="right">First Contact</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Sold</StyledTableCell>
            <StyledTableCell align="right">Owner</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.surname}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.country}</StyledTableCell>
              <StyledTableCell align="right">{row.firstContact}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <StyledTableCell align="right">{row.sold}</StyledTableCell>
              <StyledTableCell align="right">{row.owner}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}))

export default Clients

//problem with loading the props