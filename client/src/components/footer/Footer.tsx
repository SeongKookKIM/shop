import React from "react";

interface classPaddingType {
  classPadding: string;
}

function Footer({ classPadding }: classPaddingType) {
  return (
    <footer className={classPadding === "" ? "footer" : "footer active"}>
      <div className="footer-sns">
        <p>SHOP 소식을 받아보세요.</p>
        <ul>
          <li>
            <span>TIKTOK</span>
          </li>
          <li>
            <span>INSTAGRAM</span>
          </li>
          <li>
            <span>FACEBOOK</span>
          </li>
          <li>
            <span>KAKAO</span>
          </li>
          <li>
            <span>YOUTUBE</span>
          </li>
        </ul>
      </div>

      <div className="call">
        <p>고객센터</p>
        <span>1234-1234</span>
        <span>test1234@shop.com</span>
      </div>

      <div className="lang">
        <span>South Korea</span>
        <span>|</span>
        <span>대한민국</span>
      </div>

      <div className="copy">
        <span>&copy; reserved by Sam</span>
      </div>
    </footer>
  );
}

export default Footer;
