import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { BUY_COINS } from '../utils/mutations';
import Auth from '../utils/auth';
import { today } from '../utils/helpers'

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, Button, Typography, ButtonGroup } from '@material-ui/core';

function Buy(props) {
  console.log("Buy");

  const user = Auth.getProfile().data._id;
  console.log(user);
  const [buyCoins, { error }] = useMutation(BUY_COINS);
  const [formState, setFormState] = useState({ 
    symbol: props.coinItem.symbol,
    name: props.coinItem.name,
    price: props.coinItem.price,
    qty: 0,
    date: today(),
    total: 0,
    user: user
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formState);
      await buyCoins({
        variables: { 
          symbol: formState.symbol, 
          name: formState.name, 
          price: formState.price,
          qty: parseInt(formState.qty),
          date: new Date(),
          user: user
        },
      });
      console.log("Record inserted");
    } catch (e) {
      console.log(e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    const total = value * props.coinItem.price;
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
      marginTop: '200px'
    },
    btn: {
      marginRight: '15px'
    }
  }));

  const classes = useStyles();

  if (error) {
    console.log(error);
  }
  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
      <Typography variant="h4" color="textSecondary" className={classes.heading}>
          Buy {formState.name}({formState.symbol}) ${formState.price.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </Typography>
      <FormControl >
        <InputLabel htmlFor="qty">Quantity</InputLabel>
        <Input id="qty" 
          name="qty"
          type="number"
          value={formState.qty}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl >
        <Input id="date" 
          name="date"
          type="date"
          value={formState.date}
          // defaultValue={Date.today()}
          onChange={handleChange}/>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="total">Total ($)</InputLabel>
        <Input id="total" 
          name="total"
          type="text"
          value={formState.total.toLocaleString('en-US',{minimumFractionDigits: 2, maximumFractionDigits: 2})}
        />
      </FormControl>
      <ButtonGroup>
        <Button variant="contained" color="primary"
          type="submit"
          className={classes.btn}
        >
          Buy
        </Button>
        <Button fullWidth="true" variant="contained" href="/trade">
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default Buy;
