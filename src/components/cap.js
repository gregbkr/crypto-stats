import React, { useState, useEffect } from "react";
import axios from "axios";

function Cap() {
  
  // Hard coded (in Billion USD approx.)
  const gold   = 8200;
  const silver = 84;
  const sp500  = 35000;
  const usd    = 1500;

  // MARKET CAP
  const [cap, setCap] = useState({});
  const marketcap = () => {
    let btcCap;
    let ethCap;
    let defiCap;

    axios
      .get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true`)
      .then(res => {
        btcCap = (res.data.bitcoin.usd_market_cap/1000000000).toFixed(1)

        axios
          .get(`https://api.coingecko.com/api/v3/global/decentralized_finance_defi`)
          .then(res => {
            defiCap = (res.data.data.defi_market_cap/1000000000).toFixed(1)
            ethCap = (res.data.data.eth_market_cap/1000000000).toFixed(1)

            setCap({
              btc:    btcCap,
              eth:    ethCap,
              defi:   defiCap,
              gold:   gold,
              silver: silver,
              sp500:  sp500,
              usd:    usd,
            });
          })
      })
  }

  useEffect(() => {
    marketcap();
  }, []);

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Asset</th>
            <th>Total market cap in Billions of USD</th>
          </tr>
          <tr>                
            <td>BTC</td>
            <td>{cap.btc}</td>            
          </tr>
          <tr>                
            <td>ETH</td>
            <td>{cap.eth}</td>            
          </tr>
          <tr>                
            <td>DEFI</td>
            <td>{cap.defi}</td>            
          </tr>
          <tr>                
            <td>Gold</td>
            <td>{cap.gold}</td>            
          </tr>
          <tr>                
            <td>Silver</td>
            <td>{cap.silver}</td>            
          </tr>
          <tr>                
            <td>USD in circulation</td>
            <td>{cap.usd}</td>            
          </tr>
          <tr>                
            <td>S&P500</td>
            <td>{cap.sp500}</td>            
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Cap
