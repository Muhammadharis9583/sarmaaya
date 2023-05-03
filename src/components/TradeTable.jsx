/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import styles from "./DataTable.module.css";
import "../styles/modal.css";

const heads = ["Symbol", "Points", "Cur.", "Chg.", "Vol.", "Trade Option"];

function TradeTable(props) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [volume, setVolume] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState(props.data.slice(0, 10));
  const [length, setLength] = useState(10);

  useEffect(() => {
    setData(props.data.slice(0, length));
  }, [props.data, length]);

  const handleSelectChange = (e) => {
    setLength(parseInt(e.target.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do something with the form data
    console.log({ name, type, volume });
    setShow(false);
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
              />
            </label>
          </div>
        </div>
      </div>
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
                <td title={`${stock.stock_symbol} Volume`}>
                  {stock.stock_volume}
                  {parseFloat(stock.marketcap).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </td>
                <td>
                  <div style={{}}>
                    <Button
                      className="btn btn-sm d-flex"
                      variant="danger"
                      onClick={() => setShow(false)}
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
          <Button variant="secondary" onClick={() => setShow(false)}>
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
export default TradeTable;
