import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Input, InputLabel, Button, ButtonGroup, TextField, Typography } from '@material-ui/core';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      marginTop: '200px'
    },
    btn: {
      marginRight: '15px',
    }
  }));

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
    <Typography variant="h4" color="textSecondary" className={classes.heading}>
        Signup
    </Typography>
    <FormControl >
      <InputLabel htmlFor="firstName">First Name</InputLabel>
      <Input id="firstName" 
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}/>
    </FormControl>
    <FormControl >
      <InputLabel htmlFor="lastName">Last Name</InputLabel>
      <Input id="lastName" 
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}/>
    </FormControl>

    <FormControl >
      <InputLabel htmlFor="email">Email address</InputLabel>
      <Input id="email" aria-describedby="email-helper-text" 
        name="email"
        placeholder="youremail@test.com"
        onChange={handleChange}/>
      <FormHelperText id="email-helper-text">We'll never share your email.</FormHelperText>
    </FormControl>
    <FormControl>
      <TextField
        placeholder="******"
        name="password"
        type="password"
        id="pwd"
        label="Password"
        onChange={handleChange}
      />
    </FormControl>
    {error ? (
      <div>
      <p className="error-text">The provided credentials are incorrect</p>
      </div>
      ) : null
    }
    <ButtonGroup>
      <Button variant="contained" color="primary"
        className={classes.btn}
        type="submit"
      >
        Submit
      </Button>
      <Button fullWidth="true" variant="contained" href="/login">
        ← Go to Login
      </Button>
    </ButtonGroup>
  </form>
  );
}

export default Signup;
