import React from "react";
import Pages from "./pages";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <div id="outer-container">
      <Sidebar pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <div id="page-wrap">
        <Pages />
      </div>
    </div>
  );
}

export default App;
