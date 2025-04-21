import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";

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
      <Header />
      {fruits}
    </>
  );
}

export default App;
