import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  handlerAdminMenu,
  handlerAdminPagesChange,
  handlerUserClickId,
} from "../../../Store";
import { LuArrowRight } from "react-icons/lu";
import axios from "axios";
import { UserType } from "../../../type/Type";

function AdminUser() {
  const [userList, setUserList] = useState<UserType[] | undefined>();

  let dispatch = useDispatch();

  const adminNav = useSelector((state: RootState) => state.adminNav);

  useEffect(() => {
    axios
      .post("http://localhost:8080/admin/user")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //   회원삭제
  const handlerUserDeleteBtn = (user: UserType) => {
    if (window.confirm("유저의 정보를 삭제 하시겠습니까?")) {
      axios
        .post("http://localhost:8080/admin/user/delete", user)
        .then((res) => {
          alert(res.data);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className={adminNav.show ? "admin-user" : "admin-user active"}>
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
      <h6>회원 관리</h6>

      <div className="user-list">
        <ul>
          <li style={{ backgroundColor: "#e0dddd" }}>
            <span className="name">이름</span>
            <span className="email">이메일</span>
            <span className="phone">연락처</span>
            <span className="date">가입날짜</span>
          </li>
          {userList && userList.length > 0 ? (
            <>
              {userList.map((user, idx) => {
                return (
                  <li key={idx}>
                    <span
                      className="name"
                      onClick={() => {
                        dispatch(
                          handlerAdminPagesChange({
                            pages: "userDetail",
                          })
                        );
                        dispatch(
                          handlerUserClickId({
                            _id: user._id,
                          })
                        );
                      }}
                    >
                      {user.name}
                    </span>
                    <span className="email">{user.email}</span>
                    <span className="phone">{user.phone}</span>
                    <span className="date">{user.date}</span>
                    <div className="user-edit">
                      <button type="button">
                        <span
                          onClick={() => {
                            handlerUserDeleteBtn(user);
                          }}
                        >
                          삭제
                        </span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </>
          ) : (
            <li>로딩중...</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default AdminUser;
