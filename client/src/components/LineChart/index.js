import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import priceData from './btcdata.json';
import moment from 'moment';
import { getHistory } from "../../utils/cryptoapi";

export default class LineChart extends Component {

  constructor(props){
      super(props);
  }

  render() {
      if(this.props.name  !== undefined){

        let portfolioData = [];
        getHistory((this.props.name).toLowerCase().replace(/\s/g,''))
        .then((data) => {
            console.log(this.props.name);
            console.log(data);
            portfolioData.push(data);
        });
        console.log(portfolioData[0]);
        const options = {style: 'currency', currency: 'USD'};
        const numberFormat = new Intl.NumberFormat('en-US', options);
        const configPrice = {
          
          yAxis: [{
            offset: 20,
    
            labels: {
              formatter: function () {
                return numberFormat.format(this.value) 
              }
              ,
              x: -15,
              style: {
                "color": "#000", "position": "absolute"
    
              },
              align: 'left'
            },
          },
            
          ],
          tooltip: {
            shared: true,
            formatter: function () {
              return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
            }
          },
          plotOptions: {
            series: {
              showInNavigator: true,
              gapSize: 6,
    
            }
          },
          rangeSelector: {
            selected: 1
          },
          title: {
            text: `${this.props.name} stock price`
          },
          chart: {
            height: 600,
          },
      
          credits: {
            enabled: false
          },
      
          legend: {
            enabled: true
          },
          xAxis: {
            type: 'date',
          },
          rangeSelector: {
            buttons: [{
              type: 'day',
              count: 1,
              text: '1d',
            }, {
              type: 'day',
              count: 7,
              text: '7d'
            }, {
              type: 'month',
              count: 1,
              text: '1m'
            }, {
              type: 'month',
              count: 3,
              text: '3m'
            },
              {
              type: 'all',
              text: 'All'
            }],
            selected: 4
          },
          series: [{
            name: 'Price',
            type: 'spline',
      
            data: priceData,
            tooltip: {
              valueDecimals: 2
            },
      
          }
          ]
        };
        return (
          <div>
             <ReactHighcharts config = {configPrice}></ReactHighcharts>
          </div>
        )
      }
    else
        return (
            <div>
            <p> No Data</p>
            </div>
        )
  }
}
