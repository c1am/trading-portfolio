import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, ButtonGroup, Link, Grid } from '@material-ui/core';
// import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core';

import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';

import { idbPromise } from '../../utils/helpers'
import Buy from '../../pages/Buy'

function BuySell(props) {
  const [coins, setCoins] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const [coinSymbol, setCoinSymbol] = useState('');
  const [coinName, setCoinName] = useState('');
  const [coinPrice, setCoinPrice] = useState(0);
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

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {      
        marginLeft: '100px',
        margin: theme.spacing(4),
        width: '50ch',
        flexGrow: 1,
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
    btn: {
      marginRight: '15px'
    }
  }));

  const classes = useStyles();

  function handleClick(coin) {
    // console.log(event.target.parentElement.parentElement);
    setShowBuyForm(state => !state);
    setCoinSymbol(coin.symbol);
    setCoinName(coin.name);
    setCoinPrice(coin.price);
    setCoinItem(coin);
    handlePurchase();
  };

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  const handlePurchase = async (event) => {
    console.log("getCheckout");
    getCheckout({
      variables: { 
        symbol: coinSymbol, 
        name: coinName, 
        price: coinPrice }
    });
  }

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Grid container fluid spacing={2} className={classes.table} >
      <Grid item xs={9}>
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
                    // href={`/trade/buy/${coin}/$`}
                    className={classes.btn}
                    // to={{data: {symbol:coin.symbol, name:coin.name, price:coin.price}}}
                    onClick={() => handleClick(coin)}
                    // component={Link}
                    // to="/trade/buy"
                  >
                    Buy
                  </Button>
                  {/* <Link variant="outlined" color="primary"
                    className={classes.btn} 
                    component="button"
                    href="/trade/buy"
                    to={{pathname: "/trade/buy",
                        data: coin
                    }}
                    // onClick={handleClickOpen}
                  >
                    Buy
                  </Link> */}
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
      </Grid>
      <Grid item xs={3}>
        {showBuyForm ? 
          <Buy coinSymbol={coinSymbol} coinItem={coinItem} /> : <></>        
        }
      </Grid>
    </Grid>
  );
}

export default BuySell;
