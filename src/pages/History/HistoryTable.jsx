/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import styles from "../../components/DataTable.css";

function HistoryTable(props) {
  const [search, setSearch] = useState("");
  const [length, setLength] = useState(10);
  const [close, setCloseData] = useState(props.closeData.slice(0, length));
  const [expandId, setExpandId] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // for searching the data table rows and updating rows based on search terms
  useEffect(() => {
    if (search.length === 0) {
      setCloseData(props.closeData.slice(0, length));
    } else if (search.length) {
      const filteredData = close.filter((stock) =>
        stock.stock_symbol.toLowerCase().includes(search.toLowerCase())
      );
      setCloseData(filteredData);
    }
  }, [search]);

  // for updating the data table rows
  useEffect(() => {
    setCloseData(props.closeData.slice(0, length));
  }, [props.closeData, length]);

  const handleSelectChange = (e) => {
    setLength(parseInt(e.target.value));
  };
  const toggleExpansion = (index) => {
    console.log(index);
    setIsExpanded(true);
    setExpandId(index);
  };

  return (
    <>
      <div className="d-flex justify-content-between border">
        <div>
          <div className="pt-3 ps-3" id="stock-screener_length">
            <label className="d-flex gap-2 align-items-center mb-2 text-align-left" htmlFor="">
              Show
              <Form.Select className="w-auto d-inline-block" onChange={handleSelectChange}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
              stocks
            </label>
          </div>
        </div>
        {/*  */}
        <div>
          <div id="stock-screener_filter" className="pt-3 pe-3">
            <label className="d-flex align-items-baseline gap-2 mb-2">
              Search:
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder=""
                aria-controls="stock-screener"
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <Table responsive bordered striped>
        <thead>
          <tr>
            {props.tableHeads.map((head, index) => (
              <th key={index} style={{ fontWeight: "600", fontSize: 16 }}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {close.map((stock, index) => {
            return (
              <>
                <tr key={index} className="fs-6" onClick={() => toggleExpansion(index)}>
                  <td className={styles.stock_symbol}>{stock.id}</td>
                  <td title={`${stock.stock_symbol} Start Time`}>{stock.st_time}</td>
                  <td
                    style={{
                      color: stock.type == "Buy" ? "green" : "red",
                    }}
                    title={`${stock.stock_symbol} Type`}
                  >
                    {stock.type}
                  </td>
                  <td className={styles.stock_symbol}>{stock.stock_symbol}</td>
                  <td title={`${stock.stock_symbol} Start Price`}>
                    {Math.round(stock.start_currnet_price * 100) / 100}
                  </td>
                  <td title={`${stock.stock_symbol} Volume`}>{stock.stock_volume}</td>
                  <td title={`${stock.stock_symbol} End Time`}>{stock.date}</td>
                  <td title={`${stock.stock_symbol} End Price`}>
                    {Math.round(stock.stock_current_price * 100) / 100}
                  </td>
                  {/* market cap */}
                  <td
                    style={{
                      color: stock.stock_change > 0 ? "green" : "red",
                    }}
                    title={`${stock.stock_symbol} Profit`}
                  >
                    50
                  </td>
                </tr>
                {isExpanded && expandId == index ? (
                  <tr className="table-row">
                    {/* <p class="bg-dark rounded-pill text-center p-2">
                        Description
                      </p> */}
                    <td colSpan="9">
                      <span className="d-inline-flex align-items-center">
                        <p className="bg-secondary rounded-2 text-center p-1 text-white">
                          Description
                        </p>{" "}
                        <p className="m-2">{stock.description}</p>
                      </span>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
export default HistoryTable;
