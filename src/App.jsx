import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// local imports
import "./App.css";
import NavBar from "./components/NavBar";
import Symbols from "./pages/Symbols/Symbols";

import Footer from "./components/Footer";
import Trades from "./pages/Trades";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/symbols" element={<Symbols />}></Route>
          <Route exact path="/trades" element={<Trades/>}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
