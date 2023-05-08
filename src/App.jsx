import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";

library.add(faUser, faKey);

// local imports
import "./App.css";
import NavBar from "./components/NavBar";
import Symbols from "./pages/Symbols/Symbols";
import Footer from "./components/Footer";
import CurrentTrades from "./pages/Trades/CurrentTrades";
import Protfolio from "./pages/Protfolio/Protfolio";
import History from "./pages/History/History";
import Login from "./pages/Auth/Login";
import Page404 from "./components/utils/Page404";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/symbols" element={<Symbols />}></Route>
          <Route exact path="/trades" element={<CurrentTrades />}></Route>
          <Route exact path="/portfolio" element={<Protfolio />}></Route>
          <Route exact path="/history" element={<History />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
