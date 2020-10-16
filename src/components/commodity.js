import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { csv } from 'd3';

import goldData from './dataPrices/gold.csv';
import silverData from './dataPrices/silver.csv';
import sp500Data from './dataPrices/sp500.csv';
import usdPowerData from './dataPrices/usd_purchasing_power.csv';
import fedBalanceData from './dataPrices/fed_balance.csv';

function Commodity() {

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
        return goldPrice.push(row[' Open'])
      })
      csv(silverData).then(res => {
        res.map(row => {
          return silverPrice.push(row[' Open'])
        })
        csv(sp500Data).then(res => {
          res.map(row => {
            return sp500Price.push(row[' Open'])
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
  }

  // USD PURCHASING POWER
  const [usdPower, setUsdPower] = useState({});
  const usdPowerCharts = () => {
    let usdPowerPrice = [];
    let date = [];

    csv(usdPowerData).then(res => {
      res.map(row => {
        date.push(row.DATE)
        return usdPowerPrice.push(row.CUUR0000SA0R)
      })
      setUsdPower({
        labels: date,
        datasets: [
          {
            label: "USD purchasing power",
            data: usdPowerPrice,
            backgroundColor: ["rgba(125, 190, 130, 1)"],
            borderWidth: 4,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
          },
        ]
      });
    })
    // console.log(commodity)
  }

  // USD PURCHASING POWER
  const [fedBalance, setFedBalance] = useState({});
  const fedBalanceCharts = () => {
    let balance = [];
    let date = [];

    csv(fedBalanceData).then(res => {
      res.map(row => {
        date.push(row.Date)
        return balance.push(row.TotalAssets)
      })
      console.log(date)
      console.log(balance)
      setFedBalance({
        labels: date,
        datasets: [
          {
            label: "Total assets of the FED reserve",
            data: balance,
            backgroundColor: ["rgba(90, 90, 90, 0.7)"],
            borderWidth: 4,
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2,
            pointRadius: 0,
            pointHitRadius: 10,
          },
        ]
      });
    })
  }

  useEffect(() => {
    commodityCharts();
    usdPowerCharts();
    fedBalanceCharts();
  }, []);

  return (
    <div className="charts">
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
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
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
                      'month': 'MMM YYYY'
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
          data={usdPower}
          options={{
            title: {
              display: true,
              text: 'USD purchasing power (consumer price index in US city average)'
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
                }
              ],
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                  gridLines: {
                    display: false
                  },
                  type: 'time',
                  time: {
                    parser: 'YYYY-MM-DD',
                    tooltipFormat: 'll HH:mm',
                    unit: 'month',
                    unitStepSize: 1,
                    displayFormats: {
                      'month': 'MMM YYYY'
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
          data={fedBalance}
          options={{
            title: {
              display: true,
              text: 'FED balance'
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
                }
              ],
              xAxes: [
                {
                  ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                  },
                  gridLines: {
                    display: false
                  },
                  type: 'time',
                  time: {
                    parser: 'DD-MMM-YYYY',
                    tooltipFormat: 'll HH:mm',
                    unit: 'month',
                    unitStepSize: 1,
                    displayFormats: {
                      'month': 'MMM YYYY'
                    }
                  }
                }
              ]
            }
          }}
        />
      </div>
    </div >
  )
}

export default Commodity