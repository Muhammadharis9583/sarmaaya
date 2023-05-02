import React from 'react'
import TradesTable from '../components/TradesTable';

function Trades() {
  return (
    <div
      className="rounded-3 w-90 mx-auto"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      <div>
        <TradesTable/>
      </div>
    </div>
  );
}

export default Trades