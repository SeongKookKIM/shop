import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InquryType, UserType } from "../type/Type";
import axios from "axios";
import SubMenu from "../components/menu/SubMenu";
import Footer from "../components/footer/Footer";

function Contact() {
  const [userInfo, setUserInfo] = useState<UserType>();
  const [inquryList, setInquryList] = useState<InquryType[]>();

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUserInfo(JSON.parse(localUser));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      axios
        .post("/inqury", { user: userInfo._id })
        .then((res) => {
          setInquryList(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [userInfo]);

  let navigate = useNavigate();

  return (
    <div className="contact">
      <SubMenu />
      <div className="contact-table">
        <p>궁금하신 점은 무엇이든 물어봐 주세요.</p>
        <ul>
          <li className="contact-table-main">
            <span>문의날짜</span>
            <span>제목</span>
          </li>
          {inquryList && inquryList.length > 0 ? (
            <>
              {inquryList.map((it, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(`/contact/${it._id}`, { state: it });
                    }}
                  >
                    <span>{it.date}</span>
                    <span>{it.title}</span>
                  </li>
                );
              })}
            </>
          ) : (
            <li>
              <span></span>
              <span>문의 내용이 없습니다.</span>
            </li>
          )}
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
      <Footer classPadding="active" />
    </div>
  );
}

export default Contact;
