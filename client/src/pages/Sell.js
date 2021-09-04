import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BUY_COINS } from '../utils/mutations';
import Auth from '../utils/auth';
import { today } from '../utils/helpers'

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, Button, Typography, ButtonGroup } from '@material-ui/core';

function Sell(props) {
  const user = Auth.getProfile().data._id;
  console.log(user);
  const [buyCoins, { error }] = useMutation(BUY_COINS);
  const [formState, setFormState] = useState({ 
    symbol: props.coinItem.symbol,
    name: props.coinItem.name,
    qty: props.coinItem.qty,
    curPrice: props.coinItem.curPrice,
    total: props.coinItem.qty * props.coinItem.curPrice,
    date: today(),
    user: user
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    var qty = parseInt(formState.qty);
    if (qty <= 0) {
      alert("You need to enter <= " + props.coinItem.qty + " " + props.coinItem.name + " to sell.");
      return false;
    }
    if (qty > props.coinItem.qty) {
      alert("You only have " + props.coinItem.qty + " " + props.coinItem.name + " to sell.");
      return false;
    }
    qty = qty * -1;
    try {
      console.log(formState);
      await buyCoins({
        variables: { 
          symbol: formState.symbol, 
          name: formState.name, 
          price: formState.curPrice,
          qty: qty,
          date: new Date(),
          user: user
        },
      });
      console.log("Record inserted");
    } catch (e) {
      console.log(e);
    }
    window.location.href = "/trade";
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const total = value * props.coinItem.curPrice;
    setFormState({
      ...formState,
      [name]: value,
      total: total
    });
    console.log(formState);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {      
        marginLeft: '100px',
        margin: theme.spacing(3),
        width: '50ch',
      },
    },
    heading: {
      flexGrow: 1,
      fontFamily: 'Helvetica',
      fontWeight: 'bold',
      display: 'flex',
      marginTop: '50px'
    },
    input: {
      fontSize: '1rem',
      verticalAlign: 'top',
      color: '#60796b'
    }
  }));

  const classes = useStyles();

  if (error) {
    console.log(error);
  }
  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
      <Typography variant="h5" color="textSecondary" className={classes.heading}>
          Sell {formState.name} ({formState.symbol}) @ ${formState.curPrice.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </Typography>
      <FormControl >
        <InputLabel htmlFor="qty">Quantity</InputLabel>
        <Input id="qty" 
          name="qty"
          type="number"
          value={formState.qty}
          min="0"
          max={formState.qty}
          className={classes.input}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl >
      <InputLabel htmlFor="date">Date</InputLabel>
        <Input id="date" 
          name="date"
          type="date"
          value={formState.date}
          className={classes.input}
          readOnly={true}
          onChange={handleChange}/>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="total">Total ($)</InputLabel>
        <Input id="total" 
          name="total"
          type="text"
          className={classes.input}
          value={formState.total.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}
        />
      </FormControl>
      <ButtonGroup>
        <Button variant="contained" color="primary"
          type="submit"
          className={classes.btn}
        >
          Sell
        </Button>
        <Button fullWidth="true" variant="contained" href="/trade">
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default Sell;
