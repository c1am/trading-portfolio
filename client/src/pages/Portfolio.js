import React from "react";
import Jumbotron from "../components/Jumbotron";
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import PieChart from "../components/PieChart";
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

    let myChart;

    const { loading, data } = useQuery(QUERY_USER);

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


    const renderLineChart = () => {
      const historyData = [];
      //coinData.map((coin) => (historyData.push(getHistory(coin.name.toLowerCase().replace(/\s/g,'')))));
      console.log(coinData.map((coin) => (historyData.push(getHistory(coin.name.toLowerCase().replace(/\s/g,''))))));
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
      
    const classes = useStyles();

    return (
      
        <div>
        <script src="https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js"></script>
        <coingecko-coin-compare-chart-widget coin-ids={coinData.map((coin) => coin.name + ",")} locale="en"></coingecko-coin-compare-chart-widget>
          
        <Jumbotron>
            
            <h1>{userData.firstName}'s Portfolio</h1>
            <Avatar className={classes.root}></Avatar>
            {renderPieChart()}
            {renderLineChart()}
            {coinData.map((coin) => (<p>{coin.name} : {coin.value} coin(s)</p>))}
            
            
        </Jumbotron>
        </div>
    );
};

export default Portfolio;