import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./components/menu/Menu";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Cart from "./components/cart/Cart";
import Pay from "./pages/Pay";
import User from "./pages/User";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>LOADING...</div>}>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/product/:category/:item" element={<Product />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
