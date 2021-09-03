import React from 'react';
import Jumbotron from "../components/Jumbotron";
import Box from '@material-ui/core/Box';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_COINS } from '../utils/queries';
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import { getHistory } from "../utils/cryptoapi";

const Portfolio = () => {

    const { data:user_data, loading: user_loading } = useQuery(QUERY_USER);
    const { data:coin_data, error: coin_error, loading: coin_loading } = useQuery(QUERY_COINS);

    const userData = user_data?.user || {};
    const coinData = coin_data?.coins || [];
    console.log(userData);
    coinData.map((coin) => console.log(coin.name));


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

    return (
      
        <div>
        <Jumbotron>

          <Box justifyContent="center">

          <h1>{userData.firstName}'s Portfolio</h1>
             {coinData.map((coin) => (<p>{coin.name} : {coin.qty} coin(s)</p>))} 
            {renderPieChart()}
            {coinData.map((coin) => (renderLineChart(coin.name)))} 
          </Box>
            
            
            
            
        </Jumbotron>
        </div>
    );
};

export default Portfolio;