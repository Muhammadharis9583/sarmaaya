import { useEffect, useState } from "react";
import axios from "axios";
import HistoryTable from "./historyTable";

function History() {
  const [close, setCloseData] = useState([]);
  const tableHeads = [
    "Order_Id",
    "Start Time",
    "Type",
    "Symbol",
    "Start Price",
    "Volume",
    "End Time",
    "End Price",
    "Commission",
    "Profit",
  ];
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response_close = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/trades-history`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCloseData(response_close.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      setCloseData([]);
    };
  }, []);
  return (
    <div
      className="rounded-3  mx-auto min-vh-100"
      style={{ width: "80%", background: "#ffffff", marginTop: "10px" }}
    >
      <HistoryTable tableHeads={tableHeads} closeData={close} />
    </div>
  );
}

export default History;
