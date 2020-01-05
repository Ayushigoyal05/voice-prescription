import React from "react";
import "./App.css";
import Header from "./components/Header";
import "bulma/css/bulma.min.css";

function App(props) {
  return (
    <div className="App">
      <Header userAddress={props.userAddress} />
      <div style={{ marginTop: 56 }}>{props.children}</div>
    </div>
  );
}

export default App;
