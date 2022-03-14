import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Search from "./search";
import Chart from "./chart";

const Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
};

export default Pages;
