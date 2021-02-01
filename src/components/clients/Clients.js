import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#cfd8dc',
    color: '#263238',
    fontSize: 18,
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

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Clients = inject("CRMStores")(observer((props) => {

  const [relevantClients, setRelevantClients] = useState([...props.CRMStores.clients])
  const [input, setInput] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await props.CRMStores.getClients()
      setRelevantClients(props.CRMStores.clients)
      console.log(relevantClients)
    }
    fetchData()
  }, [])

  useEffect(() => {
    let tempList = props.CRMStores.clients.filter(c => {
      return c.last.toLowerCase().includes(input.toLowerCase())
    })
    setRelevantClients(tempList)
  }, [input.length])

  const handleChange = (event) => setInput(event.target.value)

  const rows = relevantClients && relevantClients.map(c => {
    return (createData(
      c.last, c.first, c.country, c.date, c.email, c.sold, c.owner))
  })

  const classes = useStyles();
  return (
    <>
      <input className='findClient' value={input} onChange={handleChange} placeholder='name'></input>
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
                <StyledTableCell align="center">{row.surname}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.country}</StyledTableCell>
                <StyledTableCell align="center">{row.firstContact}</StyledTableCell>
                <StyledTableCell align="center">{row.email}</StyledTableCell>
                <StyledTableCell align="center">{row.sold}</StyledTableCell>
                <StyledTableCell align="center">{row.owner}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}))

export default Clients
