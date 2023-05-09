/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import styles from "./DataTable.module.css";
import axios from "axios";

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
        stock.stock_symbol.toLowerCase().includes(search.toLowerCase())
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
    event.preventDefault();
    console.log({
      name: stockData.stock_title,
      symbol: stockData.stock_symbol,
      type,
      volume,
      description,
    });

    try {
      const response = await axios.post("http://localhost:3001/openTrades", {
        id: Math.random() * 10,
        stock_symbol: stockData.stock_symbol,
        type,
        indexpoints: stockData.indexpoints,
        stock_current_price: stockData.stock_current_price,
        stock_change: stockData.stock_change,
        stock_volume: volume,
        description,
        name: stockData.stock_title,
        date: new Date().toLocaleString(),
      });
      console.log(response.data);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseTradeSubmit = async (event) => {
    event.preventDefault();

    // invalid stock volume validation. parseInt is used because volume is a json string
    if (volume > parseInt(stockData.stock_volume)) {
      alert("Volume cannot be greater than stock volume");
      return;
    }
    // write to a .json file
    try {
      const response = await axios.post("http://localhost:3001/closedTrades", {
        stockId: stockData.id,
        stock_symbol: stockData.stock_symbol,
        st_time: stockData.date,
        start_currnet_price: stockData.stock_current_price,
        type: stockData.type,
        indexpoints: stockData.indexpoints,
        stock_current_price: stockData.stock_current_price,
        stock_change: stockData.stock_change,
        stock_volume: volume,
        description,
        profit: 120,
        name: stockData.stock_title,
        date: new Date().toLocaleString(),
      });
      console.log(response.data);

      // if stock volume is 0, delete the trade from open trades
      if (stockData.stock_volume - volume === 0) {
        await axios.delete(`http://localhost:3001/openTrades/${stockData.id}`);

        // delete the stock from the data table
        setData((prevData) => prevData.filter((stock) => stock.id !== stockData.id));
      } else {
        // else update the stock volume in open trades
        const updatedData = await axios.patch(`http://localhost:3001/openTrades/${stockData.id}`, {
          stock_volume: parseInt(stockData.stock_volume) - volume,
        });
        console.log(updatedData.data);

        // update the stock volume in the data table
        setData((prevData) => {
          const newData = prevData.map((stock) => {
            if (stock.id === stockData.id) {
              // create a new object with updated stock volume and return it
              return { ...stock, stock_volume: parseInt(stock.stock_volume) - volume };
            }
            // else return the stock as it is
            return stock;
          });
          // return the new data
          return newData;
        });
      }
      setShow(false);
    } catch (error) {
      console.error(error);
    }
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
          {data.map((stock, index) => {
            return (
              <tr key={index} className="fs-6">
                <td className={styles.symbol}>
                  <a href={`https://sarmaaya.pk/psx/company/${stock.stock_symbol}`}>
                    <img src="mosque.png" alt="stock image" className="mb-2" width="18px" />
                  </a>{" "}
                  {stock.stock_symbol}
                </td>
                <td title={`${stock.stock_symbol} Index Points`}>
                  {Math.round(stock.indexpoints * 100) / 100}
                </td>
                {stock.weightage && (
                  <td title={`${stock.stock_symbol} Weightage`}>
                    {Math.round(stock.weightage * 100) / 100}
                  </td>
                )}
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
                {stock.fifty_two_week_low && (
                  <>
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
                  </>
                )}
                <td title={`${stock.stock_symbol} Volume`}>{stock.stock_volume}</td>

                {/* market cap */}
                {stock.marketcap && (
                  <td title={`${stock.stock_symbol} Market Cap`}>
                    {parseFloat(stock.marketcap).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                )}
                {props.tradeType == "open" && (
                  <td
                    style={{
                      color: stock.stock_change > 0 ? "green" : "red",
                    }}
                    title={`${stock.stock_symbol} Profit`}
                  >
                    50
                  </td>
                )}
                {props.tradeType == "open" && (
                  <td
                    style={{
                      color: stock.type == "Buy" ? "green" : "red",
                    }}
                    title={`${stock.stock_symbol} Type`}
                  >
                    {stock.type}
                  </td>
                )}
                {props.tradeType == "open" && (
                  <td title={`${stock.stock_symbol} Time`}>{stock.date}</td>
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
                    {stockData?.stock_symbol}
                  </h5>
                </div>
                <div>
                  <Form.Label>Current Points</Form.Label>
                  <h5 className="text-center" style={{ color: "red" }}>
                    {Math.round(stockData?.indexpoints * 100) / 100}
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

              {/* <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              /> */}
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
                  <option value="Buy">Buy</option>
                  <option value="Sell">Sell</option>
                </Form.Control>
              </Form.Group>
            )}

            <Form.Group>
              <Form.Label>Volume:</Form.Label>
              <Form.Control
                type="number"
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
            onClick={props.tradeType !== "open" ? handleOpenTradeSubmit : handleCloseTradeSubmit}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DataTable;
