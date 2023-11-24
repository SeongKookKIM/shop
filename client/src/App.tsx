import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/menu/Menu";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Product from "./pages/Product";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>LOADING...</div>}>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
