import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Jumbotron from "../components/Jumbotron";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { getHistory } from "../utils/cryptoapi";

const Portfolio = () => {

  const coinData = [
    { name: "Bitcoin", value: 400 },
    { name: "Ethereum", value: 300 },
    { name: "Cardano", value: 300 },
    { name: "Binance Coin", value: 200 },
    { name: "Tether", value: 278 },
    { name: "XRP", value: 189 }
  ];

    const { loading, data } = useQuery(QUERY_USER);

    const userData = data?.user || {};
    console.log(userData);

    console.log(coinData);

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
    
    const renderPieChart = () => {
      if (coinData.length !== 0){
        return <h1>
          <span>
            <PieChart data={coinData}> </PieChart> 
          </span>
        </h1>;
      }
      else {
        return <h1>
          <span>
            No coins have been purchased :(
          </span>
        </h1>;
      }
    }


    function renderLineChart (coinName) {
      
      // coinData.map((coin) => (getHistory(coin.name.toLowerCase().replace(/\s/g,''))
      // .then((data) => {
      //   const historyData = [];
      //   historyData.push(data);
      //   console.log(data);
      //   return <h1>
      //     <span>
      //       <LineChart data={historyData}> </LineChart> 
      //     </span>
          
      //   </h1>;
      // })));
      console.log(coinName);
      return <LineChart name={coinName}></LineChart>;
      //const historyData = [];
      //historyData.push(getHistory(coin.name.toLowerCase().replace(/\s/g,'')));
      // console.log(historyData);

      
      // if (coinData.length !== 0){
        
      // }
      // else {
      //   return <h1>
      //     <span>
      //       No coins have been purchased :(
      //     </span>
      //   </h1>;
      // }
    }
      
    const classes = useStyles();

    return (
      
        <div>
        <Jumbotron>
            
            <h1>{userData.firstName}'s Portfolio</h1>
            <Avatar className={classes.root}></Avatar>
            {coinData.map((coin) => (<p>{coin.name} : {coin.value} coin(s)</p>))}
            {renderPieChart()}
            {coinData.map((coin) => (renderLineChart(coin.name)))}
            
            
        </Jumbotron>
        </div>
    );
};

export default Portfolio;