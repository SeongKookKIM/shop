import React, { useEffect, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  handlerAdminMenu,
  handlerAdminPagesChange,
  handlerAdmininqurtDetail,
} from "../../../Store";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import { InquryType } from "../../../type/Type";

function AdminInqury() {
  const [inquryStatus, setInquryStatus] = useState<string>("답변대기");
  const [inquryList, setInquryList] = useState<InquryType[]>([]);
  const [inqurtDate, setInquryDate] = useState<string>("old");

  let dispatch = useDispatch();
  const adminNav = useSelector((state: RootState) => state.adminNav);

  useEffect(() => {
    axios
      .post("http://localhost:8080/admin/inqury", { status: inquryStatus })
      .then((res) => {
        if (inqurtDate === "old") {
          const sortDate = res.data.sort(
            (a: any, b: any): number =>
              (new Date(a.date) as any) - (new Date(b.date) as any)
          );

          setInquryList(sortDate);
        } else if (inqurtDate === "current") {
          const sortDate = res.data.sort(
            (a: any, b: any): number =>
              (new Date(b.date) as any) - (new Date(a.date) as any)
          );

          setInquryList(sortDate);
        }
      })
      .catch((err) => console.log(err));
  }, [inquryStatus, inqurtDate]);

  return (
    <div className={adminNav.show ? "admin-inqury" : "admin-inqury active"}>
      {" "}
      <div className="nav-show">
        {adminNav.show ? (
          ""
        ) : (
          <LuArrowRight
            onClick={() => {
              dispatch(handlerAdminMenu(true));
            }}
          />
        )}
      </div>
      <h6>문의 관리</h6>
      <div className="inqury-status">
        <span
          onClick={() => {
            setInquryStatus("답변대기");
          }}
        >
          답변대기
        </span>
        <span
          onClick={() => {
            setInquryStatus("답변완료");
          }}
        >
          단변완료
        </span>
      </div>
      <div className="inqury-table">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            문의글 순서
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => {
                setInquryDate("current");
              }}
            >
              최신 문의
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setInquryDate("old");
              }}
            >
              오래된 문의
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <ul>
          <li className="inqury-title">
            <span>날짜</span>
            <span>제목</span>
          </li>
          {inquryList && inquryList.length > 0 ? (
            <>
              {inquryList.map((contact, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => {
                      dispatch(
                        handlerAdminPagesChange({
                          pages: "userInquryDetail",
                        })
                      );
                      dispatch(
                        handlerAdmininqurtDetail({
                          _id: contact._id,
                          user: contact.user,
                          title: contact.title,
                          date: contact.date,
                          detail: contact.detail,
                          imageSrc: contact.imageSrc,
                          answer: contact.answer,
                        })
                      );
                    }}
                  >
                    <span>{contact.date}</span>
                    <span>{contact.title}</span>
                  </li>
                );
              })}
            </>
          ) : (
            <li>
              <p
                style={{ width: "100%", textAlign: "center", fontSize: "12px" }}
              >
                문의내용이 존재하지 않습니다.
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AdminInqury;
