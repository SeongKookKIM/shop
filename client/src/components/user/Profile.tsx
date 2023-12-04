import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";

interface userPropsType {
  user: UserType | undefined;
}

function Profile({ user }: userPropsType) {
  const [userInfo, setUserInfo] = useState<UserType>();

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

  return (
    <div className="profile">
      <div className="profile-inner">
        <div className="profile-name">
          <p>
            이름<span>&gt;</span>
          </p>
          <span>{userInfo && userInfo.name}</span>
        </div>
        <div className="profile-adress">
          <p>
            주소<span>&gt;</span>
          </p>
          <span>{userInfo && userInfo.address}</span>
          <span>{userInfo && userInfo.addressdetail}</span>
        </div>
        <div className="profile-email">
          <p>
            이메일<span>&gt;</span>
          </p>
          <span>{userInfo && userInfo.email}</span>
        </div>
        <div className="profile-phone">
          <p>
            연락처<span>&gt;</span>
          </p>
          <span>{userInfo && userInfo.phone}</span>
        </div>
        <div className="profile-password">
          <p>
            비밀번호 변경<span>&gt;</span>
          </p>
          <span>*******</span>
        </div>
      </div>
      <div className="logout">
        <span>세션종료</span>
        <span>계정삭제</span>
      </div>
    </div>
  );
}

export default Profile;
