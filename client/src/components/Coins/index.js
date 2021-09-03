import { getPrice } from '../../utils/cryptoapi';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, ButtonGroup } from '@material-ui/core';

// import { useDispatch, useSelector } from 'react-redux'
// import { UPDATE_COIN } from '../../utils/mutations';
import { idbPromise } from '../../utils/helpers'

function Coins() {
  const [coins, setCoins] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  getPrice()
    .then((data) => { 
      if (fetchData === false) {
        setCoins(data);
        setFetchData(true);
      }
      // return data; 
    })
    // .then((data) => { console.log(data);})
    .catch((error) =>{
      console.log(error);
    })

  useEffect(() => {
     return setFetchData(false);
  }, []);
 
  idbPromise('coins', 'deleteAll')
  .then((data) => {
    coins.map((coin) => {
      var item = {
        symbol: coin.symbol,
        name: coin.name,
        price: coin.price
      };
      console.log(item);
      idbPromise('coins', 'put', item);
    });
  })

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

  return (
    <TableContainer>
      <Typography variant="h4" color="textSecondary" className={classes.heading}>
        Top 10 Crypto Currencies
      </Typography>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left"  color="textSecondary" className={classes.th}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name</TableCell>
            <TableCell align="right" className={classes.th}>Price&nbsp;</TableCell>
            <TableCell align="right" className={classes.th}>Price Change % (24h)&nbsp;</TableCell>
            <TableCell align="right" className={classes.th}>7 day Trend&nbsp;</TableCell>
            <TableCell align="center" className={classes.th}>Action&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.map((coin) => (
            <TableRow key={coin.symbol}>
              <TableCell className={classes.td}><a href={coin.coinUrl} target="_blank"><img src={coin.imageUrl} width="10%"/> {coin.name}</a></TableCell>
              <TableCell  className={classes.td} align="right">${coin.price.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
              <TableCell className={classes.td} align="right"><font color={coin.color}>{coin.priceChange24h.toLocaleString('en-US',{minimumFractionDigits: 3, maximumFractionDigits: 3})}</font></TableCell>
              <TableCell className={classes.td}><a href={coin.coinUrl} target="_blank"><img src={"https://www.coingecko.com/coins/" + coin.itemNo + "/sparkline"} srcSet={"https://www.coingecko.com/coins/" + coin.graphNo + "/sparkline 1x"} /></a></TableCell>
              <TableCell className={classes.td}>
              <ButtonGroup>
                <Button variant="contained" color="primary"
                  href="/profile/sell"
                  className={classes.btn}
                >
                  Buy
                </Button>
                <Button fullWidth="true" variant="contained" href="/profile/buy">
                  Sell
                </Button> 
              </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Coins;
