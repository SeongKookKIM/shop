import React, { useState, useEffect } from "react";
import { UserType } from "../type/Type";
import Profile from "../components/user/Profile";

function User() {
  const [user, setuser] = useState<UserType | undefined>();
  const [tabStatus, setTabStatus] = useState<string>("profile");

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setuser(JSON.parse(localUser));
    }
  }, []);

  return (
    <div className="user">
      <div className="user-inner">
        <div className="user-tab">
          <span onClick={() => setTabStatus("profile")}>프로필</span>
          <span onClick={() => setTabStatus("userBuy")}>구매내역</span>
        </div>
        {tabStatus === "profile" && <Profile user={user} />}
      </div>
    </div>
  );
}

export default User;
