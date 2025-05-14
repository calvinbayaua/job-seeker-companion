import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CoverLetter from "./pages/CoverLetter";
import axios from "axios";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/tools/coverletter" element={<CoverLetter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
