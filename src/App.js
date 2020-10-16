import React from "react";
import './App.css';
import Crypto from './components/crypto'
import Commodity from './components/commodity'
import Cap from './components/cap'


function App() {
  return (
    <div className="App">
      <h1>Assets stats</h1>
      <h2>Charts</h2>
      <div className="charts">
        <Crypto />
        <Commodity />
      </div>
      <h2>Market cap</h2>
      <Cap />
    </div>
  );
};

export default App;