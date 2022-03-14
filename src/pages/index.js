import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./search";
import Chart from "./chart";

const NotFound = () => (
  <div>
    <h1>No match</h1>
  </div>
);

var Pages = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default Pages;
