import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import styles from "../../components/DataTable.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function CurrentTradeTable(props) {
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [volume, setVolume] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");
    const [length, setLength] = useState(10);
    const [stockData, setStockData] = useState();
    const [data, setData] = useState(props.currentData.slice(0, length));
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
    useEffect(() => {
      if (search.length === 0) {
        setData(props.currentData.slice(0, length));
      } else if (search.length) {
        const filteredData = data.filter((stock) =>
          stock.symbol.toLowerCase().includes(search.toLowerCase())
        );

        setData(filteredData);
      }
    }, [search, length]);

    // for updating the data table rows
    useEffect(() => {
      setData(props.currentData.slice(0, length));
    }, [props.currentData, length]);

    const handleSelectChange = (e) => {
      setLength(parseInt(e.target.value));
    };
    const handleCloseTradeSubmit = async (event) => {
      const user = JSON.parse(sessionStorage.getItem("user"));
      event.preventDefault();

      // invalid stock volume validation. parseInt is used because volume is a json string
      if (volume > parseInt(stockData.stock_volume)) {
        alert("Volume cannot be greater than stock volume");
        return;
      }
      console.log({
        user_id: user.id,
        account_id: user.accessId,
        trade_id: stockData.trade_id,
        close_volume: volume,
        close_price: stockData.trade_price,
        close_commission: 0.0,
        close_comment: description,
        trade_price: stockData.trade_price,
        trade_commission: stockData.trade_commission,
      });

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/close-trade`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Access-Control-Allow-Origin": "*",
            },
            body: new URLSearchParams({
              user_id: user.id,
              account_id: user.accessId,
              trade_id: stockData.trade_id,
              close_volume: volume,
              close_price: stockData.trade_price,
              close_commission: stockData.trade_commission,
              close_comment: description,
              trade_price: stockData.symbol_price,
              trade_commission: 0.0,
              closedesc_tpsl: ""
            }),
            mode: "cors",
          }
        );
        console.log(response.data);
        setShow(false);
        toast.error("Trade closed successfully!", {
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
    // const handleCloseTradeSubmit = async (event) => {
    //   event.preventDefault();

    //   // invalid stock volume validation. parseInt is used because volume is a json string
    //   if (volume > parseInt(stockData.stock_volume)) {
    //     alert("Volume cannot be greater than stock volume");
    //     return;
    //   }
    //   // write to a .json file
    //   try {
    //     const response = await axios.post(
    //       `${import.meta.env.VITE_BACKEND_URL}/close-trade`,
    //       {
    //         user_id: stockData.id,
    //         account_id: stockData.symbol,
    //         trade_id: stockData.date,
    //         close_volume: stockData.stock_current_price,
    //         close_price: stockData.type,
    //         close_commission: stockData.indexpoints,
    //         stock_current_price: stockData.stock_current_price,
    //         stock_change: stockData.stock_change,
    //         stock_volume: volume,
    //         description,
    //         profit: 120,
    //         name: stockData.stock_title,
    //         date: new Date().toLocaleString(),
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Origin": "*",
    //         },
    //       }
    //     );
    //     console.log(response.data);

        // if stock volume is 0, delete the trade from open trades
        // if (stockData.stock_volume - volume === 0) {
        //   await axios.delete(
        //     `${import.meta.env.VITE_BACKEND_URL}/openTrades/${stockData.id},`,
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //       },
        //     }
        //   );

          // delete the stock from the data table
        //   setData((prevData) =>
        //     prevData.filter((stock) => stock.id !== stockData.id)
        //   );
        // } else {
        //   // else update the stock volume in open trades
        //   const updatedData = await axios.patch(
        //     `${import.meta.env.VITE_BACKEND_URL}/openTrades/${stockData.id}`,
        //     {
        //       stock_volume: parseInt(stockData.stock_volume) - volume,
        //     },
        //     {
        //       headers: {
        //         "Content-Type": "application/json",
        //         "Access-Control-Allow-Origin": "*",
        //       },
        //     }
        //   );
        //   console.log(updatedData.data);

          // update the stock volume in the data table
    //       setData((prevData) => {
    //         const newData = prevData.map((stock) => {
    //           if (stock.id === stockData.id) {
    //             // create a new object with updated stock volume and return it
    //             return {
    //               ...stock,
    //               stock_volume: parseInt(stock.stock_volume) - volume,
    //             };
    //           }
    //           // else return the stock as it is
    //           return stock;
    //         });
    //         // return the new data
    //         return newData;
    //       });
    //     }
    //     setShow(false);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const handleCloseTradeClick = (stock) => {
      // set the stock data to the stock row that was clicked
      setStockData(stock);
      setShow(true);
    };
  return (
    <div>
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
                  <td
                    title={`${stock.symbol} Sector`}
                    style={{ width: "200px" }}
                  >
                    {stock.trade_commission || "N/A"}
                  </td>
                  <td title={`${stock.symbol} Type`}>
                    {stock.trade_price || "N/A"}
                  </td>

                  <td title={`${stock.symbol} Price`}>
                    {stock.trade_volume || "N/A"}
                  </td>
                  <td
                    style={{
                      color: stock.trade_type == "buy" ? "green" : "red",
                    }}
                    title={`${stock.symbol} Type`}
                  >
                    {stock.trade_type}
                  </td>
                  <td title={`${stock.symbol} LDCP`}>
                    {stock.create_timestamp || "N/A"}
                  </td>
                  <td>
                    <div>
                      <Button
                        onClick={() => handleCloseTradeClick(stock)}
                        className="btn btn-sm d-flex m-auto"
                        variant="danger"
                      >
                        Close Trade
                      </Button>
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
            <Modal.Title>Close Trade</Modal.Title>
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
                    <Form.Label>Current Volume</Form.Label>
                    <h5 className="text-center" style={{ color: "red" }}>
                      {Math.round(stockData?.trade_volume * 100) / 100}
                    </h5>
                  </div>
                  <div>
                    <Form.Label>Current Price</Form.Label>
                    <h5 className="text-center" style={{ color: "red" }}>
                      {Math.round(stockData?.trade_price * 100) / 100}
                    </h5>
                  </div>
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
            <Button variant="primary" onClick={handleCloseTradeSubmit}>
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
    </div>
  );
}

export default CurrentTradeTable;
