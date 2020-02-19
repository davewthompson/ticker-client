import React, { useCallback, useState } from 'react';

import Selector from './components/Selector';
import Grid from './components/Grid';

import useInterval from './hooks/useInterval';

import { DATA_URL } from './common/static';

import './App.css';


function App() {
  const [rows, setRows] = useState([]);

  const handleStockTickerSelected = useCallback((symbol) => {
    if (rows.some(({ symbol: existing }) => symbol === existing)) {
      return;
    }

    setRows([...rows, {
      symbol, bid: '...', ask: '...', vol: '...',
    }]);
  }, [rows, setRows]);

  const tick = useCallback(() => {
    (async () => {
      const newRows = await Promise.all(rows.map(async ({ symbol }) => {
        const response = await fetch(`${DATA_URL}/price/${symbol}`);
        const json = await response.json();
        return {
          symbol,
          ask: json.ask.toFixed(2),
          bid: json.bid.toFixed(2),
          lastVol: json.lastVol,
        };
      }));
      setRows(newRows);
    })();
  }, [rows, setRows]);

  useInterval(tick, 1000);

  return (
    <div className="App">
      <Selector onSelect={handleStockTickerSelected} />
      <Grid rows={rows} />
    </div>
  );
}

export default App;
