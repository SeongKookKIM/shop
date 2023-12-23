import React, { Suspense, useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"));

const Login = lazy(() => import("./pages/Login"));

const Sign = lazy(() => import("./pages/Sign"));

const Product = lazy(() => import("./pages/Product"));

const Detail = lazy(() => import("./pages/Detail"));

const Pay = lazy(() => import("./pages/Pay"));

const MobilePayment = lazy(() => import("./components/pay/MobilePayment"));

const User = lazy(() => import("./pages/User"));

const Contact = lazy(() => import("./pages/Contact"));

const Search = lazy(() => import("./pages/Search"));

const Inqury = lazy(() => import("./components/user/inqury/Inqury"));

const InquryDetail = lazy(
  () => import("./components/user/inqury/InquryDetail")
);

const AdminHome = lazy(() => import("./pages/admin/AdminHome"));

const NotFound = lazy(() => import("./NotFound"));

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="App">
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span>페이지 로딩중입니다....</span>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/product/:category/:item" element={<Product />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/pay/success" element={<MobilePayment />} />
          <Route path="/user" element={<User />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact/inqury" element={<Inqury />} />
          <Route path="/contact/:id" element={<InquryDetail />} />
          <Route path="/search" element={<Search />} />

          {/* Admin */}
          <Route path="/admin/home" element={<AdminHome />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
