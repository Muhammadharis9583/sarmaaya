import currentTrades from "../../../currentTrades.json";
import DataTable from "../../components/DataTable";

const CurrentTrades = () => {
  const tableHeads = ["Symbol", "Points", "Cur.", "Chg.", "Vol.", "Profit", "Trade Option"];
  return (
    <div
      className="rounded-3 w-90 mx-auto"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      {/* <TradeTable
        data={currentTrades.trades}
        length={currentTrades.trades.length}
        tradeType="open"
      /> */}
      <DataTable
        tableHeads={tableHeads}
        data={currentTrades.trades}
        length={currentTrades.trades.length}
        tradeType="open"
      />
    </div>
  );
};

export default CurrentTrades;
