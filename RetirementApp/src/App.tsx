import React from "react";
import "./App.css";
import Routing from "./Routing";
function App() {
  return (
    <>
      <h1>
        {import.meta.env.VITE_URL}
        {8990}
      </h1>
      <Routing />
    </>
  );
}

export default App;
