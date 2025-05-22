import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import CoverLetter from "./pages/CoverLetter";
import Account from "./pages/Account";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/coverletter" element={<CoverLetter />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
