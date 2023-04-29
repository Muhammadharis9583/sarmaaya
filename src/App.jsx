import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// local imports
import "./App.css";
import NavBar from "./components/NavBar";
import Symbols from "./pages/Symbols/Symbols";

import Footer from "./components/Footer";

function App() {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/symbols" element={<Symbols />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
