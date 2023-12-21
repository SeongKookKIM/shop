import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserType } from "../../../type/Type";

interface IdPropsType {
  id: string;
}

function AdminUserInfo({ id }: IdPropsType) {
  const [userInfo, setUserInfo] = useState<UserType | undefined>();

  useEffect(() => {
    axios
      .post("/admin/user/info", { _id: id })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="user-detail-info">
      <div className="name">
        <p>이름</p>
        <span>{userInfo?.name}</span>
      </div>
      <div className="name">
        <p>이메일</p>
        <span>{userInfo?.email}</span>
      </div>
      <div className="name">
        <p>연락처</p>
        <span>{userInfo?.phone}</span>
      </div>
      <div className="name">
        <p>주소</p>
        <span>{userInfo?.address}</span>
        <span>{userInfo?.addressdetail}</span>
      </div>
      <div className="date">
        <p>가입일자</p>
        <span>{userInfo?.date}</span>
      </div>
    </div>
  );
}

export default AdminUserInfo;
