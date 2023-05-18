import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import axios from "axios";
import CurrentTradeTable from "./CurrentTradeTable";

const CurrentTrades = () => {
  const [currentTrades, setCurrentTrades] = useState([]);
  const tableHeads = [
    "Symbol",
    "Commission",
    "Current Price",
    "Volume",
    "Type",
    "Time",
    "Trade Option",
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/current-trades`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setCurrentTrades(response.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      setCurrentTrades([]);
    };
  }, []);
  return (
    <div
      className="rounded-3  mx-auto min-vh-100"
      style={{ width: "80%", background: "#ffffff", marginTop: "10px" }}
    >
      <CurrentTradeTable tableHeads={tableHeads} currentData={currentTrades} />
    </div>
  );
};

export default CurrentTrades;
