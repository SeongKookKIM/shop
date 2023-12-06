import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";

interface UserPropsType {
  userInfo: UserType | undefined;
  setProfileEdit: React.Dispatch<React.SetStateAction<string>>;
}

function ProfilePassword({ userInfo, setProfileEdit }: UserPropsType) {
  const [passwordEdit, setPasswordEdit] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfrimPassword] = useState<string>("");
  const [psConfirm, setPsConfirm] = useState<Boolean>(false);
  const [paswwordAlert, setPasswordAlert] = useState<string>(
    "* 대문자+영문+숫자+특수문자를 포함한 8자이상 입력해주세요."
  );
  const [paswwordAlertClass, setPasswordAlertClass] = useState<string>("");

  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;

  const handlerPasswordConfirm = () => {
    axios
      .post("http://localhost:8080/profile/edit/password/confirm", {
        _id: userInfo?._id,
        password: passwordEdit,
      })
      .then((res) => {
        setPsConfirm(true);
      })
      .catch((err) => {
        alert("비밀번호를 확인해주세요.");
      });
  };

  const handlerPassword = (
    passwordChecked: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (passwordChecked.target.value.length === 0) {
      setPasswordAlert(
        "* 대문자+영문+숫자+특수문자를 포함한 8자이상 입력해주세요."
      );
    } else {
      if (passwordChecked.target.value.match(passwordReg) === null) {
        setPasswordAlert("* 비밀번호 형식이 아닙니다.");
      } else {
        setPasswordAlert("");
      }
    }
  };

  const handlerPasswordEdit = () => {
    if (newPassword === confirmPassword) {
      if (window.confirm("비밀번호를 변경하시겠습니까?")) {
        axios
          .post("http://localhost:8080/profile/edit/password", {
            _id: userInfo?._id,
            password: newPassword,
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
    } else {
      alert("비밀번호가 일지하지 않습니다.");
    }
  };

  return (
    <div className="profile-edit-password">
      {psConfirm ? (
        <>
          <LuArrowLeft
            className="back"
            onClick={() => {
              setProfileEdit("all");
            }}
          />
          <p>비밀번호 변경하기</p>
          <form>
            <input
              type="password"
              name="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                handlerPassword(e);
              }}
              placeholder="새로운 비밀번호"
            ></input>
            <span className={`password-alert ${paswwordAlertClass}`}>
              {paswwordAlert}
            </span>
            <input
              type="password"
              name="passwordConfirm"
              onChange={(e) => {
                setConfrimPassword(e.target.value);
              }}
              placeholder="비밀번호 확인"
            ></input>
          </form>
          <div className="change-btn">
            <span onClick={handlerPasswordEdit}>변경하기</span>
          </div>
        </>
      ) : (
        <>
          <LuArrowLeft
            className="back"
            onClick={() => {
              setProfileEdit("all");
            }}
          />
          <p>현재 비밀번호확인</p>
          <form>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                setPasswordEdit(e.target.value);
              }}
            ></input>
          </form>
          <div className="change-btn">
            <span onClick={handlerPasswordConfirm}>확인하기</span>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePassword;
