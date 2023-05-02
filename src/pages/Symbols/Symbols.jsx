import { useState } from "react";
import { Form } from "react-bootstrap";
import DataTable from "../../components/DataTable";
import stocks from "../../../dummy_data/stocks.json";

const Symbols = () => {
  return (
    <div
      className="rounded-3 w-90 mx-auto"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      <div>
        <DataTable data={stocks.data} length={length} tradeType="" />
      </div>
    </div>
  );
};

export default Symbols;
