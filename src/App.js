import React, { useState, useEffect } from "react";
import './App.css';
import { Line } from "react-chartjs-2";
import axios from "axios";
import { csv } from 'd3';
import Mycap from './components/cap'
import goldData from './dataPrices/gold.csv';
import silverData from './dataPrices/silver.csv';
import sp500Data from './dataPrices/sp500.csv';

// temp data load
// import res from "./components/res_stocks"

function App() {

  // CRYPTO
  const [crypto, setCrypto] = useState({});
  const cryptoChart = () => {    
    let dayRange = 3650 // 10 years
    let btcPrice = [];
    let date = [];
    
  //   axios
  //     .get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${dayRange}`)
  //     .then(res => {
  //       for (const row of res.data.prices) {
  //         date.push(parseInt(row[0]));
  //         btcPrice.push(parseInt(row[1]));
  //       }
  //       axios
  //         .get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${dayRange}`)
  //         .then(res => {
  //           for (const row of res.data.prices) {
  //             // date.push(parseInt(row[0]));
  //             ethPrice.push(parseInt(row[1]));
  //           }
  //         setCrypto({
  //           labels: date,
  //           datasets: [
  //             {
  //               label: "Ethereum / USD",
  //               data: ethPrice,
  //               backgroundColor: ["rgba(106, 90, 205, 0.6)"],
  //               borderWidth: 4,
  //               pointBorderWidth: 1,
  //               pointHoverRadius: 5,
  //               pointHoverBorderWidth: 2,
  //               pointRadius: 0,
  //               pointHitRadius: 10,
  //             },
  //             {
  //               label: "Bitcoin / USD",
  //               data: btcPrice,
  //               backgroundColor: ["rgba(255, 130, 0, 0.6)"],
  //               borderWidth: 4,
  //               pointBorderWidth: 1,
  //               pointHoverRadius: 5,
  //               pointHoverBorderWidth: 2,
  //               pointRadius: 0,
  //               pointHitRadius: 10,
  //             }
  //           ]
  //         });
  //       });
  //     });
  // };  

  }

  // COMMODITY (GOLD, SYLVER + S&P500)
  const [commodity, setCommodity] = useState({});
  const commodityCharts = () => {
    let goldPrice = [];
    let silverPrice = [];
    let sp500Price = [];
    let date = [];

    csv(goldData).then(res => { 
      res.map(row => {
        date.push(row.Date)
        goldPrice.push(row[' Open'])
      })
      csv(silverData).then(res => { 
        res.map(row => {
          // date.push(row.Date)
          silverPrice.push(row[' Open'])
        })
        csv(sp500Data).then(res => { 
          res.map(row => {
            // date.push(row.Date)
            sp500Price.push(row[' Open'])
          })

          setCommodity({
            labels: date,
            datasets: [
              {
                label: "GOLD",
                data: goldPrice,
                backgroundColor: ["rgba(255, 200, 0, 0.4)"],
                borderWidth: 4,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
              },
              {
                label: "SILVER",
                data: silverPrice,
                backgroundColor: ["rgb(120, 120, 120, 0.6)"],
                borderWidth: 4,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
              },
              {
                label: "S&M500",
                data: sp500Price,
                backgroundColor: ["rgba(255, 150, 150, 0.6)"],
                borderWidth: 4,
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
              },
            ]
          });
        });
      });
    })
    // console.log(commodity)
  }
 

  useEffect(() => {
    // marketcap();
    cryptoChart();
    commodityCharts();
  }, []);

  return (
    <div className="App">
      <h1>Assets stats</h1>
      <h2>Charts</h2>
      <div className="charts">
        <div className="chart">
          <Line
              data={crypto}
              options={{
                title: {
                  display: true,
                  text: 'Crypto'
                },
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10,
                        beginAtZero: true
                      },
                      gridLines: {
                        display: true
                      },
                      scaleLabel: {
                        display: true,
                        labelString: 'Price in USD'
                      }
                    }
                  ],
                  xAxes: [
                    {
                      gridLines: {
                        display: false
                      },
                      type: 'time',
                      time: {
                        parser: 'MM/DD/YYYY HH:mm',
                        tooltipFormat: 'll HH:mm',
                        unit: 'month',
                        unitStepSize: 1,
                        displayFormats: {
                          'month': 'MMM YY'
                        }
                      }
                    }
                  ]
                }
              }}
            />
        </div>
        <div className="chart">
          <Line
            data={commodity}
            options={{
              title: {
                display: true,
                text: 'Commodities and S&P500'
              },
              responsive: true,
              maintainAspectRatio: true,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      autoSkip: true,
                      maxTicksLimit: 10,
                      beginAtZero: true
                    },
                    gridLines: {
                      display: true
                    },
                    scaleLabel: {
                      display: true,
                      labelString: 'Price in USD'
                    }
                  }
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false
                    },
                    type: 'time',
                    time: {
                      parser: 'MM/DD/YYYY',
                      tooltipFormat: 'll HH:mm',
                      unit: 'month',
                      unitStepSize: 1,
                      displayFormats: {
                        'month': 'MMM YY'
                      }
                    }
                  }
                ]
              }
            }}
          />
        </div>
      </div>
      <h2>Market cap</h2>
      <Mycap />
    </div>
  );
};

export default App;