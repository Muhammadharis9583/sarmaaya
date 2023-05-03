import currentTrades from "../../../currentTrades.json";
import TradeTable from "../../components/TradeTable";
const CurrentTrades = () => {
  return (
    <div
      className="rounded-3 w-90 mx-auto"
      style={{ width: "90%", background: "#ffffff", marginTop: "10px" }}
    >
      <TradeTable
        data={currentTrades.trades}
        length={currentTrades.trades.length}
        tradeType="open"
      />
    </div>
  );
};

export default CurrentTrades;
