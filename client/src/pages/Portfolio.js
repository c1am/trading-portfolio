import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';


const Portfolio = () => {

    const { loading, data } = useQuery(QUERY_USER);
    console.log(useQuery(QUERY_USER));

    const userData = data?.user || {};

    const useStyles = makeStyles({
        root: {
          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
          border: 0,
          borderRadius: 3,
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
          color: 'white',
          height: 48,
          padding: '0 30px',
        },
      });
      
    const classes = useStyles();

    return (
        <div>
        <Jumbotron>
            
            <h1>{userData.firstName}'s Portfolio</h1>
            <Avatar></Avatar>
            <h1>
            <span role="img" aria-label="Face With Rolling Eyes Emoji">
                🙄
            </span>
            </h1>
        </Jumbotron>
        </div>
    );
};

export default Portfolio;