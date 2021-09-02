import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, ButtonGroup, TextField } from '@material-ui/core';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import { idbPromise } from '../../utils/helpers'

function BuySell() {
  const [coins, setCoins] = useState([]);
  const [fetchData, setFetchData] = useState(false);
  // const [open, setOpen] = useState(false);

  idbPromise('coins', 'get')
  .then((data) => { 
    if (fetchData === false) {
      setCoins(data);
      setFetchData(true);
    }
    // return data; 
  })
  .then((data) => { console.log(data);})
  .catch((error) =>{
    console.log(error);
  })

  useEffect(() => {
    return setFetchData(false);
  }, []);

  coins.sort((a, b) => (a.price < b.price) ? 1 : -1);
  console.log(coins);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {      
        marginLeft: '100px',
        margin: theme.spacing(4),
        width: '50ch',
      },
    },
    table: {
      minWidth: 650,
      maxWidth: 900,
      marginLeft: 150
    },
    heading: {
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '200px',
      marginBottom: '50px'
    },
    th: {
      fontSize: '1.5rem',
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      color: '#00796b'
    },
    td: {
      fontSize: '1.25rem',
      verticalAlign: 'top'
    },
    btnElement: {
      width: 300,
    }
  }));

  const classes = useStyles();

  // function handleClickOpen(name, price) {
  //   setOpen({open: true, name: name, price: price});
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <TableContainer className={classes.table} >
      <Typography variant="h4" color="textSecondary" className={classes.heading}>
        Trade Crypto Currencies
      </Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"  color="textSecondary" className={classes.th}>Symbol</TableCell>
            <TableCell className={classes.th}>Name&nbsp;</TableCell>
            <TableCell align="right" className={classes.th}>Price &nbsp;</TableCell>
            <TableCell align="right" className={classes.th}>Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.symbol}>
              <TableCell className={classes.td}>{coin.symbol}</TableCell>
              <TableCell className={classes.td}>{coin.name}</TableCell>
              <TableCell  className={classes.td} align="right">${coin.price.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
              <TableCell className={classes.td} align="right">
              <ButtonGroup>
                <Button variant="contained" color="primary"
                  href="/trade/buy"
                  className={classes.btn}
                  // onClick={handleClickOpen}
                >
                  Buy
                </Button>
                <Button fullWidth="true" variant="contained"
                //  href="/trade/sell"
                 >
                  Sell
                </Button> 
              </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Buy </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Buy , Price 
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="qty"
            label="Quantity"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Proceed
          </Button>
        </DialogActions>
      </Dialog> */}
    </TableContainer>
  );
}

export default BuySell;
