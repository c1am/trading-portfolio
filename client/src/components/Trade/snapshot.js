import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_COINS } from '../../utils/queries';
import Auth from '../../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Table, TableBody, TableHead, TableCell, TableRow, TableFooter, Button, ButtonGroup } from '@material-ui/core';
import Sell from '../../pages/Sell';

function Snapshot(props) {
  const { data:user_data, loading: user_loading } = useQuery(QUERY_USER);
  const { data:coin_data, error: coin_error, loading: coin_loading } = useQuery(QUERY_COINS);
  const [showSellForm, setShowSellForm] = useState(false);
  const [coinItem, setCoinItem] = useState('');

  const userData = user_data?.user || {};
  const coinData = coin_data?.coins || [];

  // summarize
  var snapshot = [];
  coinData.map((coin) => {
    var index = snapshot.map((e) => {return e.name}).indexOf(coin.name);
    if (index === -1) {
      var item = {
        symbol: coin.symbol,
        name: coin.name,
        qty: coin.qty,
        amount: coin.price,
        curPrice: 0,
        lossGain: 0
      };    
      snapshot.push(item);
    }
    else {
      var qty = snapshot[index].qty + coin.qty;
      var price = snapshot[index].amount + coin.qty * coin.price;
      snapshot[index] = {
        symbol: snapshot[index].symbol,
        name: snapshot[index].name,
        qty: qty,
        amount: price,
        curPrice: 0,
        lossGain: 0
      };
    }
  });

  // loss/gain
  var total = 0;
  var totalLossGain = 0;
  var totalQty = 0;
  snapshot.map((item) => {
    var coinIndex = props.coins.map((e) => {return e.name}).indexOf(item.name);
    if (coinIndex !== -1) {
      var curPrice = props.coins[coinIndex].price;
      item.lossGain = curPrice * item.qty - item.amount;
      totalLossGain += item.lossGain;
      item.curPrice = props.coins[coinIndex].price;
    }
    total += item.amount;
    totalQty += item.qty;
  });

  snapshot.map((item) => console.log("item", item));

  function handleClick(coin) {
    // console.log(event.target.parentElement.parentElement);
    setShowSellForm(state => !state);
    setCoinItem(coin);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {      
        marginLeft: '100px',
        margin: theme.spacing(3),
        width: '50ch',
        flexGrow: 1,
      },
    },
    table: {
      minWidth: 300,
      maxWidth: 800,
      marginLeft: 100
    },
    heading: {
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '200px',
      marginBottom: '50px',
      marginLeft: 150
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
    },
  }));

  const classes = useStyles();
  return (
    <Grid >
      <Grid>
        <Typography variant="h5" color="textSecondary" className={classes.heading}>
            {userData.firstName}'s Snapshot
        </Typography>
        <Table aria-label="simple table"  className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="left"  color="textSecondary" className={classes.th}>Name</TableCell>
              <TableCell className={classes.th}>Qty&nbsp;</TableCell>
              <TableCell align="right" className={classes.th}>Amount</TableCell>
              <TableCell align="right" className={classes.th}>Loss/Gain</TableCell>
              <TableCell align="right" className={classes.th}>Action&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {snapshot.map((coin) => (
              <TableRow key={coin.symbol}>
                <TableCell className={classes.td}>{coin.name}</TableCell>
                <TableCell align="right" className={classes.td}>{coin.qty}</TableCell>
                <TableCell align="right" className={classes.td}>${coin.amount.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                <TableCell align="right" className={classes.td}>{coin.lossGain.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                <TableCell className={classes.td} align="center">
                <ButtonGroup>
                  <Button variant="contained" color="primary" onClick={() => handleClick(coin)}
                  >
                    Sell
                  </Button>
                </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="left"  color="textSecondary" className={classes.th}>Total</TableCell>
              <TableCell align="right" className={classes.th}>{totalQty}</TableCell>
              <TableCell align="right" className={classes.th}>${total.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
              <TableCell align="right" className={classes.th}>{totalLossGain.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
              <TableCell align="right" className={classes.th}></TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Grid>
      <Grid>      
        {showSellForm ? 
          <Sell coinItem={coinItem} /> : <></>        
        }
      </Grid>
    </Grid>
  );
}

export default Snapshot;
