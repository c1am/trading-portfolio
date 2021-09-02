import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Input, InputLabel, Button, TextField, Typography, ButtonGroup } from '@material-ui/core';

function Buy(props) {
  console.log("Buy");
  
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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

  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
      <Typography variant="h4" color="textSecondary" className={classes.heading}>
          Buy 
      </Typography>
      <FormControl >
        <InputLabel htmlFor="qty">Quantity</InputLabel>
        <Input id="qty" 
          name="qty"
          type="number"
          onChange={handleChange}/>
      </FormControl>
      <FormControl >
        <Input id="date" 
          name="date"
          type="date"
          // defaultValue={Date.today()}
          onChange={handleChange}/>
      </FormControl>
      <FormControl >
        <InputLabel htmlFor="qty">Total</InputLabel>
        <Input id="total" 
          name="total"
          type="number"
          onChange={handleChange}/>
      </FormControl>
      <ButtonGroup>
        <Button variant="contained" color="primary"
          type="submit"
          className={classes.btn}
        >
          Buy
        </Button>
        <Button fullWidth="true" variant="contained" href="/signup">
          Cancel
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default Buy;
