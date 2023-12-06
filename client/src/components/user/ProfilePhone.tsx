import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";

interface UserPropsType {
  userInfo: UserType | undefined;
  setProfileEdit: React.Dispatch<React.SetStateAction<string>>;
}

function ProfilePhone({ userInfo, setProfileEdit }: UserPropsType) {
  const [phoneEdit, setPhoneEdit] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setPhoneEdit(userInfo.phone);
    }
  }, []);

  const handlerPhoneEdit = () => {
    if (phoneEdit === "") {
      alert("귀하의 연락처를 적어주세요.");
    } else {
      if (window.confirm("연락처를 변경하시겠습니까?")) {
        axios
          .post("http://localhost:8080/profile/edit/phone", {
            _id: userInfo?._id,
            phone: phoneEdit,
          })
          .then((res) => {
            alert(res.data);

            axios
              .post("http://localhost:8080/profile", { _id: userInfo?._id })
              .then((res) => {
                localStorage.removeItem("user");

                localStorage.setItem("user", JSON.stringify(res.data));

                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        return;
      }
    }
  };

  return (
    <div className="profile-edit-phone">
      <LuArrowLeft
        className="back"
        onClick={() => {
          setProfileEdit("all");
        }}
      />
      <p>연락처</p>
      <input
        type="text"
        name="phone"
        value={phoneEdit}
        onChange={(e) => {
          setPhoneEdit(e.target.value);
        }}
      ></input>
      <div className="change-btn">
        <span onClick={handlerPhoneEdit}>변경하기</span>
      </div>
    </div>
  );
}

export default ProfilePhone;
