/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import styles from "./DataTable.module.css";
import stocks from "../../dumm_data/stocks.json";

const heads = [
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
function DataTable(props) {
  // stocks to lenth of 10
  const [data, setData] = useState(stocks.data.slice(0, 10));
  useEffect(() => {
    setData(stocks.data.slice(0, props.length));
  }, [props.length]);

  return (
    <Table responsive bordered striped>
      <thead>
        <tr>
          {heads.map((head, index) => (
            <th key={index} style={{ fontWeight: "600", fontSize: 16 }}>
              {head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((stock, index) => {
          return (
            <tr key={index} className="fs-6">
              <td className={styles.symbol}>
                <a href="https://sarmaaya.pk/psx/company/THALL">
                  <img src="mosque.png" alt="stock image" className="mb-2" width="18px" />
                </a>{" "}
                {stock.stock_symbol}
              </td>
              <td title={`${stock.stock_symbol} Index Points`}>
                {Math.round(stock.indexpoints * 100) / 100}
              </td>
              <td title={`${stock.stock_symbol} Weightage`}>
                {Math.round(stock.weightage * 100) / 100}
              </td>
              <td title={`${stock.stock_symbol} Current Price`}>
                {Math.round(stock.stock_current_price * 100) / 100}
              </td>
              <td
                style={{
                  color: stock.stock_change > 0 ? "green" : "red",
                }}
                title={`${stock.stock_symbol} Change`}
              >
                {Math.round(stock.stock_change * 100) / 100}
              </td>
              <td
                style={{
                  color: stock.stock_change_p > 0 ? "green" : "red",
                }}
                title={`${stock.stock_symbol} Change%`}
              >
                {Math.round(stock.stock_change_p * 100) / 100}
              </td>
              <td title={`${stock.stock_symbol} 52WK High`}>
                {Math.round(stock.fifty_two_week_high * 100) / 100}
              </td>
              <td title={`${stock.stock_symbol} 52WK Low`}>
                {Math.round(stock.fifty_two_week_low * 100) / 100}
              </td>
              <td title={`${stock.stock_symbol} Volume`}>{stock.stock_volume}</td>
              <td title={`${stock.stock_symbol} Market Cap`}>
                {parseFloat(stock.marketcap).toFixed(2)}
              </td>
              <td>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button className="btn btn-sm d-flex  m-auto" variant="success">
                    Open Trade
                  </Button>
                  <Button className="btn btn-sm d-flex  m-auto" variant="danger">
                    Close Trade
                  </Button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
export default DataTable;
