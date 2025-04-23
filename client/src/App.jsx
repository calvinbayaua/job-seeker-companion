import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoverLetter from "./pages/CoverLetter";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);
  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.fruits);
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  const fruits = array.map((fruit, index) => (
    <div key={index}>
      <p>{fruit}</p>
    </div>
  ));

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/tools/coverletter" element={<CoverLetter />} />
        </Routes>
      </BrowserRouter>
      {/* {fruits} */}
    </>
  );
}

export default App;
