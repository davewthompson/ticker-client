import React from 'react';
import PropTypes from 'prop-types';

export default function Grid({ rows }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th style={{ width: '100px' }}>Bid</th>
          <th style={{ width: '100px' }}>Ask</th>
          <th style={{ width: '100px' }}>Last Vol</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({
          symbol, bid, ask, lastVol,
        }) => (
          <tr key={symbol}>
            <td>{symbol}</td>
            <td>{bid}</td>
            <td>{ask}</td>
            <td>{lastVol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Grid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string,
    bid: PropTypes.string,
    ask: PropTypes.string,
    vol: PropTypes.string,
  })),
};

Grid.defaultProps = {
  rows: [],
};
