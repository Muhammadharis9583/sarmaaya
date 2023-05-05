import { useEffect, useState } from "react";
import currentTrades from "../../../currentTrades.json";
import DataTable from "../../components/DataTable";
import axios from "axios";

const CurrentTrades = () => {
  const [data, setData] = useState([]);
  const tableHeads = [
    "Symbol",
    "Points",
    "Current Price",
    "Change",
    "Volume",
    "Profit",
    "Type",
    "Trade Option",
  ];

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get("http://localhost:3001/openTrades");
        setData(response.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }

    return () => {
      setData([]);
    };
  }, []);
  return (
    <div
      className="rounded-3  mx-auto"
      style={{ width: "80%", background: "#ffffff", marginTop: "10px" }}
    >
      <DataTable tableHeads={tableHeads} data={data} tradeType="open" />
    </div>
  );
};

export default CurrentTrades;
