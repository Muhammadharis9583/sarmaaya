import { useState } from "react";
import { Form } from "react-bootstrap";
import DataTable from "../../components/DataTable";
import styles from "./Symbols.module.css";

const Symbols = () => {
  const [length, setLength] = useState(10);

  const handleSelectChange = (e) => {
    setLength(parseInt(e.target.value));
  };
  return (
    <div
      className="rounded-3 w-90 m-auto"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      <div>
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
        <DataTable length={length} />
      </div>
    </div>
  );
};

export default Symbols;
