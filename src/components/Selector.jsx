import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import { DATA_URL } from '../common/static';

export default function Selector({ onSelect }) {
  const [symbols, setSymbols] = useState([]);
  const [dropdownValue, setDropdownValue] = useState('');


  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(`${DATA_URL}/static/tickers`);
        const json = await response.json();
        if (cancelled) {
          return;
        }

        setSymbols(json);
      } catch (err) {
        console.error('failed to fetch symbols', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDropdownValueChange = useCallback(({ target: { value } }) => {
    setDropdownValue(value);
  }, []);

  const handleAddSymbol = useCallback(() => {
    if (!onSelect) {
      return;
    }

    onSelect(dropdownValue);
  }, [onSelect, dropdownValue]);

  return (
    <>
      <select value={dropdownValue} onChange={handleDropdownValueChange}>
        {['', ...symbols.sort()].map((symbol) => (<option key={symbol} value={symbol}>{symbol}</option>))}
      </select>
      <button type="submit" onClick={handleAddSymbol} disabled={!dropdownValue}>Add</button>
    </>
  );
}

Selector.propTypes = {
  onSelect: PropTypes.func,
};

Selector.defaultProps = {
  onSelect: () => {},
};
