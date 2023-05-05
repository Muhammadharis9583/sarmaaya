import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// local imports
import "./App.css";
import NavBar from "./components/NavBar";
import Symbols from "./pages/Symbols/Symbols";

import Footer from "./components/Footer";
import CurrentTrades from "./pages/Trades/CurrentTrades";
import Protfolio from "./pages/Protfolio/Protfolio";
import History from "./pages/History/History";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/symbols" element={<Symbols />}></Route>
          <Route exact path="/trades" element={<CurrentTrades />}></Route>
          <Route exact path="/portfolio" element={<Protfolio />}></Route>
          <Route exact path="/history" element={<History />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
