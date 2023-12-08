import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sign from "./pages/Sign";
import Product from "./pages/Product";
import Detail from "./pages/Detail";
import Pay from "./pages/Pay";
import User from "./pages/User";
import Contact from "./pages/Contact";
import Inqury from "./components/user/inqury/Inqury";
import InquryDetail from "./components/user/inqury/InquryDetail";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>LOADING...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/product/:category/:item" element={<Product />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/user" element={<User />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/inqury" element={<Inqury />} />
          <Route path="/contact/:id" element={<InquryDetail />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
