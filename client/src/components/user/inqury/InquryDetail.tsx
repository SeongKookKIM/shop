import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import { InquryType } from "../../../type/Type";
import axios from "axios";
import SubMenu from "../../menu/SubMenu";
import Footer from "../../footer/Footer";

function InquryDetail() {
  const [inquryList, setInquryList] = useState<InquryType>();

  let list = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    setInquryList(list.state);
  }, []);

  const handlerInquryDelete = () => {
    if (window.confirm("해당 문의를 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/inqury/delete", inquryList)
        .then((res) => {
          alert(res.data);
          navigate("/contact");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className="inqury-detail">
      <SubMenu />
      <LuArrowLeft className="back" onClick={() => navigate(-1)} />
      {inquryList && (
        <div className="detail-inner">
          <p className="title">{inquryList.title}</p>
          <span className="date">{inquryList.date}</span>
          <p className="detail">문의내용</p>
          <textarea
            typeof="text"
            name="detail"
            defaultValue={inquryList.detail}
            disabled
          ></textarea>
          <p className="image">이미지</p>
          <ul>
            {inquryList.imageSrc.map((image, idx) => {
              return (
                <li key={idx}>
                  <img src={image} />
                </li>
              );
            })}
          </ul>

          <div className="answer-box">
            <p>답변</p>
            <div className="answer">
              <textarea
                typeof="text"
                name="answer"
                defaultValue={inquryList.answer}
                disabled
              ></textarea>
            </div>
          </div>
        </div>
      )}

      <span className="inqury-delete" onClick={handlerInquryDelete}>
        삭제하기
      </span>
      <Footer classPadding="active" />
    </div>
  );
}

export default InquryDetail;
