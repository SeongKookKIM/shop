import React from "react";
import { useNavigate } from "react-router-dom";

function Contact() {
  let navigate = useNavigate();
  return (
    <div className="contact">
      <div className="contact-table">
        <p>궁금하신 점은 무엇이든 물어봐 주세요.</p>
        <ul>
          <li className="contact-table-main">
            <span>문의날짜</span>
            <span>제목</span>
          </li>
          <li>
            <span>2023-10-10</span>
            <span>제목</span>
          </li>
          <li>
            <span>2023-10-12</span>
            <span>제목</span>
          </li>
        </ul>
      </div>

      <span
        className="inqury"
        onClick={() => {
          navigate("/contact/inqury");
        }}
      >
        문의하기
      </span>
    </div>
  );
}

export default Contact;
