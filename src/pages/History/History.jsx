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
     "Profit",
   ];
     useEffect(() => {
       try {
         const fetchData = async () => {
           const response_close = await axios.get("http://localhost:3001/closedTrades");
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

export default History