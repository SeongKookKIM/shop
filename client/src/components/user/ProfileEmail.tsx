import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";

interface UserPropsType {
  userInfo: UserType | undefined;
  setProfileEdit: React.Dispatch<React.SetStateAction<string>>;
}
function ProfileEmail({ userInfo, setProfileEdit }: UserPropsType) {
  const [emailEdit, setEmailEdit] = useState<string>("");
  const [emailAlert, setEmailAlert] = useState<string>("");
  const [emailAlertClass, setEmailAlertClass] = useState<string>("");
  const [emailEditBtn, setEmailEditBtn] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setEmailEdit(userInfo.email);
    }
  }, []);

  //   핸들러
  const emailRegEx =
    /^[A-Za-z0-9]*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const handlerEmail = (emailChecked: React.ChangeEvent<HTMLInputElement>) => {
    if (emailChecked.target.value.length === 0) {
      setEmailAlert("* 이메일을 입력해주세요.");
      setEmailAlertClass("active");
      setEmailEditBtn("hide");
    } else {
      if (emailChecked.target.value.match(emailRegEx) === null) {
        setEmailAlert("* 이메일 형식이 아닙니다.");
        setEmailAlertClass("active");
        setEmailEditBtn("hide");
      } else {
        setEmailAlert("");
        setEmailAlertClass("");
        setEmailEditBtn("");
      }
    }
  };

  const handlerEmailEdit = () => {
    if (emailEdit === "") {
      alert("귀하의 이메일을 입력해주세요.");
    } else {
      if (window.confirm("이메일을 변경하시겠습니까?")) {
        axios
          .post("/profile/edit/email", {
            _id: userInfo?._id,
            email: emailEdit,
          })
          .then((res) => {
            alert(res.data);

            axios
              .post("/profile", { _id: userInfo?._id })
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
    <div className="profile-edit-email">
      <LuArrowLeft
        className="back"
        onClick={() => {
          setProfileEdit("all");
        }}
      />
      <p>이메일</p>
      <input
        type="text"
        name="email"
        autoComplete="off"
        value={emailEdit}
        onChange={(e) => {
          setEmailEdit(e.target.value);
          handlerEmail(e);
        }}
        required
      ></input>
      <span className={emailAlertClass}>{emailAlert}</span>
      <div className="change-btn">
        <span onClick={handlerEmailEdit} className={emailEditBtn}>
          변경하기
        </span>
      </div>
    </div>
  );
}

export default ProfileEmail;
