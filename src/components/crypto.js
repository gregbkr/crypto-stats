import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

function Crypto() {

  // CRYPTO
  const [crypto, setCrypto] = useState({});
  const cryptoChart = () => {
    let dayRange = 1800 // 5 years
    let btcPrice = [];
    let ethPrice = [];
    let date = [];

    axios
      .get(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${dayRange}`)
      .then(res => {
        for (const row of res.data.prices) {
          date.push(parseInt(row[0]));
          btcPrice.push(parseInt(row[1]));
        }
        axios
          .get(`https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=${dayRange}`)
          .then(res => {
            for (const row of res.data.prices) {
              // date.push(parseInt(row[0]));
              ethPrice.push(parseInt(row[1]));
            }
            setCrypto({
              labels: date,
              datasets: [
                {
                  label: "Ethereum / USD",
                  data: ethPrice,
                  backgroundColor: ["rgba(106, 90, 205, 0.6)"],
                  borderWidth: 4,
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBorderWidth: 2,
                  pointRadius: 0,
                  pointHitRadius: 10,
                },
                {
                  label: "Bitcoin / USD",
                  data: btcPrice,
                  backgroundColor: ["rgba(255, 130, 0, 0.6)"],
                  borderWidth: 4,
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBorderWidth: 2,
                  pointRadius: 0,
                  pointHitRadius: 10,
                }
              ]
            });
          });
      });
  };

  useEffect(() => {
    cryptoChart();
  }, []);

  return (
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
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10,
                },
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
                    'month': 'MMM YYYY'
                  }
                }
              }
            ]
          }
        }}
      />
    </div>
  )

}

export default Crypto