import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import { FormControl, FormHelperText, Input, InputLabel, Button, Box, TextField, Typography } from '@material-ui/core';

function Login(props) {
  console.log("Login ya");
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
        margin: theme.spacing(4),
        width: '50ch',
      },
    },
    heading: {
      flexGrow: 1,
      fontFamily: 'Helvetica',
      marginTop: '150px'
    },
    btnElement: {
      width: 300,
    }
  }));

  const classes = useStyles();

  return (
    <form className={classes.root} onSubmit={handleFormSubmit}>
      <Typography variant="h4" color="textSecondary" className={classes.heading}>
          Login
      </Typography>
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
      <Box className={classes.btnElement}>
        <Button variant="contained" color="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button fullWidth="true" variant="contained" href="/signup">
          ← Go to Signup
        </Button>
      </Box>
    </form>
  );
}

export default Login;
