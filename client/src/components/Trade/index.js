import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableHead, TableCell, TableRow, Typography, Button, ButtonGroup, Grid } from '@material-ui/core';

import { idbPromise } from '../../utils/helpers';

import Buy from '../../pages/Buy';
import Snapshot from './snapshot';

function Trade(props) {
  const [coins, setCoins] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const [showBuyForm, setShowBuyForm] = useState(false);
  const [coinItem, setCoinItem] = useState('');

  idbPromise('coins', 'get')
  .then((data) => { 
    if (fetchData === false) {
      setCoins(data);
      setFetchData(true);
    }
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


  function handleClick(coin) {
    setShowBuyForm(state => true);
    setCoinItem(coin);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {      
        marginLeft: '100px',
        margin: theme.spacing(4),
        width: '50ch',
        flexGrow: 1,
      },
    },
    grid: {
      maxWidth: 1500
    },
    table: {
      minWidth: 650,
      maxWidth: 850,
      marginLeft: 50
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
      fontSize: '1rem',
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      color: '#00796b'
    },
    td: {
      fontSize: '1rem',
      verticalAlign: 'top',
      color: '#60796b'
    }
  }));

  const classes = useStyles();

  return (
    <Grid container fluid spacing={4} className={classes.grid} >
      <Grid item sm={7}>
        <Typography variant="h4" color="textSecondary" className={classes.heading}>
          Trade Crypto Currencies
        </Typography>
        <Table aria-label="simple table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left"  color="textSecondary" className={classes.th}>Symbol</TableCell>
              <TableCell className={classes.th}>Name&nbsp;</TableCell>
              <TableCell align="right" className={classes.th}>Price &nbsp;</TableCell>
              <TableCell align="center" className={classes.th}>Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.symbol}>
                <TableCell className={classes.td}>{coin.symbol}</TableCell>
                <TableCell className={classes.td}>{coin.name}</TableCell>
                <TableCell  className={classes.td} align="right">${coin.price.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                <TableCell className={classes.td} align="center">
                  <Button variant="contained" color="primary" onClick={() => handleClick(coin)}>
                    Buy
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item sm={5}>
          <Snapshot coins={coins}/>        
        {showBuyForm ? 
          <Buy coinItem={coinItem} /> : <></>        
        }
      </Grid>
    </Grid>
  );
}

export default Trade;
