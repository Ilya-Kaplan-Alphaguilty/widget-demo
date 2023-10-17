import React from "react";
import { Route, Routes } from "react-router-dom";
import Button from "./Button";
import Open from "./Open";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<></>} />
        <Route path="open" element={<Open />} />
        <Route path="button" element={<Button />} />
      </Routes>
    </div>
  );
}

export default App;
