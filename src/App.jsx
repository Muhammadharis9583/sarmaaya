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
  const user = JSON.parse(sessionStorage.getItem("user"));
  let routes;

  if (user) {
    routes = (
      <>
        <Route exact path="/symbols" element={<Symbols />}></Route>
        <Route exact path="/trades" element={<CurrentTrades />}></Route>
        <Route exact path="/portfolio" element={<Protfolio />}></Route>
        <Route exact path="/history" element={<History />}></Route>
        <Route path="/login" element={<Navigate to="/symbols" />}></Route>

        <Route path="*" element={<Page404 />}></Route>
      </>
    );
  } else {
    routes = (
      <>
        <Route exact path="/login" element={<Login />}></Route>
        <Route path="*" element={<Navigate to="/login" />}></Route>
      </>
    );
  }
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>{routes}</Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
