import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";
import ProfileName from "./ProfileName";
import ProfileAddress from "./ProfileAddress";
import ProfileEmail from "./ProfileEmail";
import ProfilePhone from "./ProfilePhone";
import ProfilePassword from "./ProfilePassword";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

interface userPropsType {
  user: UserType | undefined;
}

function Profile({ user }: userPropsType) {
  const [userInfo, setUserInfo] = useState<UserType>();

  const [profileEdit, setProfileEdit] = useState<string>("all");

  let navigate = useNavigate();

  useEffect(() => {
    if (user) {
      axios
        .post("http://localhost:8080/profile", { _id: user._id })
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const handlerAccountExit = () => {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const handelrAccountDelete = () => {
    if (window.confirm("귀하의 계정을 삭제하시겠습니까?")) {
      axios
        .post("http://localhost:8080/profile/delete", { _id: userInfo?._id })
        .then((res) => {
          alert(res.data);
          localStorage.removeItem("user");
          navigate("/");
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  };

  return (
    <div className="profile">
      <div className="profile-inner">
        {profileEdit === "all" && (
          <>
            {" "}
            <div className="profile-name">
              <p onClick={() => setProfileEdit("name")}>
                이름<span>&gt;</span>
              </p>
              <span>{userInfo && userInfo.name}</span>
            </div>
            <div className="profile-adress">
              <p onClick={() => setProfileEdit("address")}>
                주소<span>&gt;</span>
              </p>
              <span>{userInfo && userInfo.address}</span>
              <span>{userInfo && userInfo.addressdetail}</span>
            </div>
            <div className="profile-email">
              <p onClick={() => setProfileEdit("email")}>
                이메일<span>&gt;</span>
              </p>
              <span>{userInfo && userInfo.email}</span>
            </div>
            <div className="profile-phone">
              <p onClick={() => setProfileEdit("phone")}>
                연락처<span>&gt;</span>
              </p>
              <span>{userInfo && userInfo.phone}</span>
            </div>
            <div className="profile-password">
              <p onClick={() => setProfileEdit("password")}>
                비밀번호 변경<span>&gt;</span>
              </p>
              <span>*******</span>
            </div>
            <div className="logout">
              <span onClick={handlerAccountExit}>세션종료</span>
              {userInfo?.role && userInfo.role ? (
                ""
              ) : (
                <span onClick={handelrAccountDelete}>계정삭제</span>
              )}
            </div>
          </>
        )}
        {profileEdit === "name" && (
          <ProfileName userInfo={userInfo} setProfileEdit={setProfileEdit} />
        )}
        {profileEdit === "address" && (
          <ProfileAddress userInfo={userInfo} setProfileEdit={setProfileEdit} />
        )}
        {profileEdit === "email" && (
          <ProfileEmail userInfo={userInfo} setProfileEdit={setProfileEdit} />
        )}
        {profileEdit === "phone" && (
          <ProfilePhone userInfo={userInfo} setProfileEdit={setProfileEdit} />
        )}
        {profileEdit === "password" && (
          <ProfilePassword
            userInfo={userInfo}
            setProfileEdit={setProfileEdit}
          />
        )}
      </div>
      {userInfo?.role && userInfo.role === "admin" && (
        <span
          className="admin-login"
          onClick={() => {
            navigate("/admin/home");
          }}
        >
          관리자 페이지
        </span>
      )}
      <Footer classPadding="active" />
    </div>
  );
}

export default Profile;
