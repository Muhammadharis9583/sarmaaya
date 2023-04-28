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
    <div className={styles.dataTable}>
      <div className={styles.dataTables_wrapper}>
        <div className="d-flex justify-content-between border">
          <div className="">
            <div className={styles.dataTables_length} id="stock-screener_length">
              <label className={styles.label} htmlFor="">
                Show
                <Form.Select onChange={handleSelectChange}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Form.Select>
                stocks
              </label>
            </div>
          </div>
          <div className="">
            <div id="stock-screener_filter" className={styles.dataTables_filter}>
              <label className={styles.searchLabel}>
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
