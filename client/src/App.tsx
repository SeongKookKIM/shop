import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/menu/Menu";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>LOADING...</div>}>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
