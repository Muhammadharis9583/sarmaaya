import axios from "axios";
import DataTable from "../../components/DataTable";
import { useEffect, useState } from "react";

const Symbols = () => {
  const [stocks, setStocks] = useState([]);
  const tableHeads = [
    "Symbol",
    "Sector",
    "Title",
    "Type",
    "Price",
    "LDCP",
    "Deduction",
    "Status",
    "Trade Option",
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/stockData`,
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "ngrok-skip-browser-warning": "any",
            },
            mode: "cors",
          }
        );
        const data = await response.json();
        console.log(data);
        setStocks(data.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }

    // cleanup function
    return () => {
      setStocks([]);
    };
  }, []);
  if (!stocks.length) return <div>Loading...</div>;
  return (
    <div
      className="rounded-3 w-90 mx-auto min-vh-100"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      <div>
        <DataTable tableHeads={tableHeads} openData={stocks} length={stocks.length} tradeType="" />
      </div>
    </div>
  );
};

export default Symbols;
