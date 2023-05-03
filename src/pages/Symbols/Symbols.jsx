import { useState } from "react";
import DataTable from "../../components/DataTable";
import stocks from "../../../dummy_data/stocks.json";

const Symbols = () => {
  const tableHeads = [
    "Symbol",
    "Points",
    "Weight",
    "Cur.",
    "Chg.",
    "Chg%.",
    "52WK High",
    "52WK Low",
    "Vol.",
    "Market Cap(000's)",
    "Trade Option",
  ];
  return (
    <div
      className="rounded-3 w-90 mx-auto"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      <div>
        <DataTable tableHeads={tableHeads} data={stocks.data} length={length} tradeType="" />
      </div>
    </div>
  );
};

export default Symbols;
