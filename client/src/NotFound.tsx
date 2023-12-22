import React from "react";
import Footer from "./components/footer/Footer";
import SubMenu from "./components/menu/SubMenu";

function NotFound() {
  return (
    <div className="not-found">
      <SubMenu />
      <div className="not-found-text">
        <span>페이지가 존재하지 않습니다.</span>
      </div>
      <Footer classPadding={"active"} />
    </div>
  );
}

export default NotFound;
