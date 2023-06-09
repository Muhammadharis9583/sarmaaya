/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import styles from "./DataTable.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function DataTable(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [volume, setVolume] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState("");
  const [length, setLength] = useState(10);
  const [stockData, setStockData] = useState();
  const [data, setData] = useState(props.openData.slice(0, length));

  // ---------------------- UI FUNCTIONS ---------------------------
  useEffect(() => {
    // cleanup function
    return () => {
      setName("");
      setType("");
      setVolume("");
      setDescription("");
      setLength(10);
      setStockData();
    };
  }, []);

  // for searching the data table rows and updating rows based on search terms
  useEffect(() => {
    if (search.length === 0) {
      setData(props.openData.slice(0, length));
    } else if (search.length) {
      const filteredData = data.filter((stock) =>
        stock.symbol.toLowerCase().includes(search.toLowerCase())
      );

      setData(filteredData);
    }
  }, [search, length]);

  // for updating the data table rows
  useEffect(() => {
    setData(props.openData.slice(0, length));
  }, [props.openData, length]);

  const handleSelectChange = (e) => {
    setLength(parseInt(e.target.value));
  };

  const handleOpenTradeClick = (stock) => {
    // set the stock data to the stock row that was clicked
    setStockData(stock);
    setShow(true);
  };

  // ---------------------------- API FUNCTIONS -----------------------------
  const handleOpenTradeSubmit = async (event) => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    event.preventDefault();
    console.log({
      user_id: user.id,
      account_id: user.accessId,
      name: stockData.stock_title,
      trade_symbol: stockData.symbol,
      trade_type: type,
      trade_comment: description,
      trade_volume: volume,
      trade_price: stockData.symbol_price,
      trade_commission: 0.0,
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/open-trade`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
        body: new URLSearchParams({
          user_id: user.id,
          account_id: user.accessId,
          trade_symbol: stockData.symbol,
          trade_type: type,
          trade_comment: description,
          trade_volume: volume,
          trade_price: stockData.symbol_price,
          trade_commission: 0.0,
        }),
        mode: "cors",
      });
      console.log(response.data);
      setShow(false);
      toast.success("Trade opend successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between border">
        <div>
          <div className="pt-3 ps-3" id="stock-screener_length">
            <label
              className="d-flex gap-2 align-items-center mb-2 text-align-left"
              htmlFor=""
            >
              Show
              <Form.Select
                className="w-auto d-inline-block"
                onChange={handleSelectChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value={200}>200</option>
                <option value={300}>300</option>
                <option value={400}>400</option>
                <option value={500}>500</option>
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
          {data.map((stock, index) => {
            return (
              <tr key={index} className="fs-6">
                <td className={styles.symbol}>
                  <img
                    src="mosque.png"
                    alt="stock image"
                    className="mb-2"
                    width="18px"
                  />
                  <a href={`https://sarmaaya.pk/psx/company/${stock.symbol}`}>
                    {stock.symbol}
                  </a>
                </td>
                <td title={`${stock.symbol} Sector`} style={{ width: "200px" }}>
                  {stock.symbol_sector || "N/A"}
                </td>
                {stock.weightage && (
                  <td title={`${stock.symbol} Weightage`}>
                    {Math.round(stock.weightage * 100) / 100}
                  </td>
                )}
                <td title={`${stock.symbol} Title`} style={{ width: "300px" }}>
                  {stock.symbol_title || "N/A"}
                </td>
                <td title={`${stock.symbol} Type`}>
                  {stock.symbol_type || "N/A"}
                </td>

                <td title={`${stock.symbol} Price`}>
                  {stock.symbol_price || "N/A"}
                </td>
                <td title={`${stock.symbol} LDCP`}>
                  {stock.symbol_ldcp || "N/A"}
                </td>
                <td title={`${stock.symbol} Dfault Deduction`}>
                  {stock.default_deduction || "N/A"}
                </td>
                <td title={`${stock.symbol} Status`}>
                  {stock.symbol_status || "N/A"}
                </td>

                {props.tradeType == "open" && (
                  <td
                    style={{
                      color: stock.type == "Buy" ? "green" : "red",
                    }}
                    title={`${stock.symbol} Type`}
                  >
                    {stock.type}
                  </td>
                )}
                <td>
                  <div>
                    {props.tradeType !== "open" && (
                      <Button
                        className="btn btn-sm d-flex  m-auto"
                        variant="success"
                        onClick={() => handleOpenTradeClick(stock)}
                      >
                        Open Trade
                      </Button>
                    )}
                    {props.tradeType === "open" && (
                      <Button
                        onClick={() => handleOpenTradeClick(stock)}
                        className="btn btn-sm d-flex m-auto"
                        variant="danger"
                      >
                        Close Trade
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {show && <div className="modal-overlay" />}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Open Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="d-flex justify-content-center">
              <div className="d-inline-flex w-75 justify-content-between">
                <div>
                  <Form.Label>Symbol Name</Form.Label>
                  <h5 className="text-center" style={{ color: "#69df07" }}>
                    {stockData?.symbol}
                  </h5>
                </div>
                <div>
                  <Form.Label>LDCP</Form.Label>
                  <h5 className="text-center" style={{ color: "red" }}>
                    {Math.round(stockData?.symbol_ldcp * 100) / 100}
                  </h5>
                </div>
                {props.tradeType === "open" && (
                  <div>
                    <Form.Label>Current Profit</Form.Label>
                    <h5 className="text-center" style={{ color: "red" }}>
                      {Math.round(stockData?.indexpoints * 100) / 100}
                    </h5>
                  </div>
                )}
              </div>
            </Form.Group>

            {props.tradeType !== "open" && (
              <Form.Group>
                <Form.Label>Type:</Form.Label>
                <Form.Control
                  required
                  as="select"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>Volume:</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter volume"
                value={volume}
                onChange={(event) => setVolume(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={ handleOpenTradeSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default DataTable;
