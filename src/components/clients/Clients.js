import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table, Paper, TableBody, TableCell, TableContainer, TableHead,TableRow } from '@material-ui/core'


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
  return { surname, name, country, firstContact, email, sold, owner };
}

// const rows = props.CRMStores.clients.map()


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


const Clients = inject("CRMStores")(observer((props) => {
  console.log(props.CRMStores.clients[0]);
  useEffect(() => {
    props.CRMStores.getClients()
  }, [props.CRMStores.clients])

  //props.CRMStores.clients.length


  const rows = props.CRMStores.clients.length && props.CRMStores.clients[0].map(c => {
    return (createData(
      c.last, c.first, c.country, c.date, c.email, c.sold, c.owner))
  })

  rows.length && console.log(rows)
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Surname</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Country</StyledTableCell>
            <StyledTableCell align="center">First Contact</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Sold</StyledTableCell>
            <StyledTableCell align="center">Owner</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length && rows.map((row) => (
            <StyledTableRow >
              <StyledTableCell align="left">{row.surname}</StyledTableCell>
              <StyledTableCell align="left">{row.name}</StyledTableCell>
              <StyledTableCell align="left">{row.country}</StyledTableCell>
              <StyledTableCell align="left">{row.firstContact}</StyledTableCell>
              <StyledTableCell align="left">{row.email}</StyledTableCell>
              <StyledTableCell align="left">{row.sold}</StyledTableCell>
              <StyledTableCell align="left">{row.owner}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}))

export default Clients
