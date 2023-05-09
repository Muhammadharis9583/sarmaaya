import { useEffect, useState } from "react";
import DataTable from "../../components/DataTable";
import axios from "axios";

const CurrentTrades = () => {
  const [open, setOpenData] = useState([]);
  const tableHeads = [
    "Symbol",
    "Points",
    "Current Price",
    "Change",
    "Volume",
    "Profit",
    "Type",
    "Time",
    "Trade Option",
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/openTrades`
        );
        setOpenData(response.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      setOpenData([]);
    };
  }, []);
  return (
    <div
      className="rounded-3  mx-auto min-vh-100"
      style={{ width: "80%", background: "#ffffff", marginTop: "10px" }}
    >
      <DataTable tableHeads={tableHeads} openData={open} tradeType="open" />
    </div>
  );
};

export default CurrentTrades;
