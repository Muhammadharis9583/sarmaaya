import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <div className="d-flex justify-content-center align-items-center">
        <h1 style={{ color: "darkgreen" }}>Sarmaaya.pk</h1>
        <img
          src="https://scontent.fisb1-2.fna.fbcdn.net/v/t1.6435-9/107169168_157506672535703_4313405693061431182_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=DoiaJfRlc6cAX-IWKSo&_nc_ht=scontent.fisb1-2.fna&oh=00_AfAcjULtIv5Luf7dlvwWyB6UjM9yYw7kcgxGghzNDdF6HA&oe=64719E63"
          height={500}
          width={500}
        />
      </div>
    </>
  );
}

export default App;
