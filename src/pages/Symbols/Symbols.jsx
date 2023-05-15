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
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/stockData`, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": import.meta.env.VITE_BACKEND_URL,
            "ngrok-skip-browser-warning": "any",
          },
          withCredentials: "false",
        });
        console.log(response.data.data.length);
        setStocks(response.data.data);
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
  if (!stocks) return <div>Loading...</div>;
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
