/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import styles from "./DataTable.module.css";

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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [volume, setVolume] = useState("");
  const [description, setDescription] = useState("");
  // stocks to lenth of 10
  const [data, setData] = useState(props.data.slice(0, 10));
  useEffect(() => {
    setData(props.data.slice(0, props.length));
  }, [props.data, props.length]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log({ name, type, volume });
    handleClose();
  };
  return (
    <>
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
                    <Button
                      className="btn btn-sm d-flex  m-auto"
                      variant="success"
                      onClick={handleShow}
                    >
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
      {show && <div className="modal-overlay" />}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Open Trade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex justify-content-center">
              <div className="d-inline-flex w-75 justify-content-between">
                <div>
                  <Form.Label>Symbol Name</Form.Label>
                  <h5 className="text-center" style={{ color: "#69df07" }}>
                    YOUW
                  </h5>
                </div>
                <div>
                  <Form.Label>Current Points</Form.Label>
                  <h5 className="text-center" style={{ color: "red" }}>
                    -0.15
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

            <Form.Group>
              <Form.Label>Type:</Form.Label>
              <Form.Control
                as="select"
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option value="">Select type</option>
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </Form.Control>
            </Form.Group>

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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default DataTable;

// conver 88536122737.95 to 88,536,122,737.95 in javascript code
// parseFloat(88536122737.95).toLocaleString("en-US", {
//   style: "currency",
//   currency: "USD",
// });
