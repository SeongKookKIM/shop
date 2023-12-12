import axios from "axios";
import React, { useEffect, useState } from "react";
import { InquryType } from "../../../type/Type";

interface IdPropsType {
  id: string;
}

function AdminUserInqury({ id }: IdPropsType) {
  const [userIquryList, setUserInquryList] = useState<
    InquryType[] | undefined
  >();

  const [inquryDetailShow, setInquryDetailShow] = useState<boolean>(false);
  const [inquryDetail, setInquryDetail] = useState<InquryType>();

  useEffect(() => {
    axios
      .post("http://localhost:8080/admin/user/inqury", { _id: id })
      .then((res) => {
        setUserInquryList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlerClickInqury = (inqury: InquryType) => {
    setInquryDetailShow(true);
    setInquryDetail(inqury);
  };

  return (
    <div className="user-inqury">
      <ul>
        <li className="contact-table-main">
          <span>문의날짜</span>
          <span>제목</span>
        </li>
        {userIquryList && userIquryList.length > 0 ? (
          <>
            {userIquryList.map((inqury, i) => {
              return (
                <li
                  key={i}
                  onClick={() => {
                    handlerClickInqury(inqury);
                  }}
                >
                  <span>{inqury.date}</span>
                  <span>{inqury.title}</span>
                </li>
              );
            })}
          </>
        ) : (
          <li
            style={{
              width: "100%",
              fontSize: "14px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            문의목록이 존재 하지 않습니다.
          </li>
        )}
      </ul>

      {inquryDetailShow && inquryDetail ? (
        <div className="inqury-detail">
          <div className="detail-inner">
            <p className="title">{inquryDetail.title}</p>
            <span className="date">{inquryDetail.date}</span>
            <p className="detail">문의내용</p>
            <textarea
              typeof="text"
              name="detail"
              value={inquryDetail.detail}
              disabled
            ></textarea>
            <p className="image">이미지</p>
            <ul>
              {inquryDetail.imageSrc.map((image, idx) => {
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
                  value={inquryDetail.answer}
                  disabled
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AdminUserInqury;
