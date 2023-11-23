import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";

function Sign() {
  const [signName, setSignName] = useState<string>("");
  const [signEmail, setSignEmail] = useState<string>("");
  const [signPassword, setSignPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [signPhone, setSignPhone] = useState<string>("");
  const [signadress, setSignAdress] = useState<string>("");
  const [signadressDetail, setSignAdressDetail] = useState<string>("");

  //   ALERT
  const [emailAlert, setEmailAlert] = useState<string>("");
  const [passwordAlert, setPasswordAlert] = useState<string>(
    "* 대문자+영문+숫자+특수문자를 포함한 8자이상 입력해주세요."
  );
  const [passwordConfirmAlert, setPasswordConfirmAlert] = useState<string>("");
  const [phoneAlert, setPhoneAlert] = useState<string>("");

  //   정규식
  const emailRegEx =
    /^[A-Za-z0-9]*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
  const phoneReg = /^[0-9\b -]{0,13}$/;

  //   핸들러
  const handlerEmail = (emailChecked: React.ChangeEvent<HTMLInputElement>) => {
    if (emailChecked.target.value.length === 0) {
      setEmailAlert("* 이메일을 입력해주세요.");
    } else {
      if (emailChecked.target.value.match(emailRegEx) === null) {
        setEmailAlert("이메일 형식이 아닙니다.");
      } else {
        setEmailAlert("");
      }
    }
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
        setPasswordAlert("비밀번호 형식이 아닙니다.");
      } else {
        setPasswordAlert("");
      }
    }
  };
  const handlerPasswordConfirm = (
    confirm: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (signPassword === confirm.target.value) {
      setPasswordConfirmAlert("");
    } else {
      setPasswordConfirmAlert("* 비밀번호가 일치하지 않습니다.");
    }
  };
  const handlerPHone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length === 0) {
      setPhoneAlert("* 핸드폰 번호를 입력해주세요.");
    } else {
      setPhoneAlert("");
    }
  };

  //   주소API
  const open = useDaumPostcodePopup(
    "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setSignAdress(fullAddress);
  };
  const handlerFindAdress = () => {
    let popupWidth = 500;
    let popupHeight = 600;
    let popupX = Math.round(window.screen.width / 2 - popupWidth / 2);
    let popupY = Math.round(window.screen.height / 2 - popupHeight / 2);
    open({
      onComplete: handleComplete,
      width: popupWidth,
      height: popupHeight,
      top: popupY,
      left: popupX,
    });
  };

  return (
    <div className="sign">
      <div className="sign-wrapper">
        <span>회원가입</span>
        <span className="alert">*모든 항목은 필수 입력란입니다.</span>
        <form>
          <div className="sign-name">
            <label>이름</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              onChange={(e) => {
                setSignName(e.target.value);
              }}
              required
            />
          </div>
          <div className="sign-email">
            <label>이메일</label>
            <input
              type="text"
              autoComplete="off"
              onChange={(e) => {
                setSignEmail(e.target.value);
                handlerEmail(e);
              }}
              required
            />
            <span>{emailAlert}</span>
          </div>
          <div className="sign-pw">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              onChange={(e) => {
                setSignPassword(e.target.value);
                handlerPassword(e);
              }}
              required
            />
            <span>{passwordAlert}</span>
          </div>
          <div className="sign-pw-confirm">
            <label>비밀번호 확인</label>
            <input
              type="password"
              name="confirm"
              autoComplete="off"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
                handlerPasswordConfirm(e);
              }}
              required
            />
            <span>{passwordConfirmAlert}</span>
          </div>

          <div className="sign-phone">
            <label>핸드폰</label>
            <input
              type="number"
              name="phone"
              autoComplete="off"
              onWheel={(e) => {
                (e.target as HTMLInputElement).blur();
              }}
              onChange={(e) => {
                setSignPhone(e.target.value);
                handlerPHone(e);
              }}
              required
            />
            <span>{phoneAlert}</span>
          </div>
          <div className="sign-adress">
            <label>주소</label>
            <div className="adress-wrapper">
              <input
                type="text"
                name="adress"
                defaultValue={signadress}
                autoComplete="off"
              />
              <button
                type="button"
                className="find-adress"
                onClick={handlerFindAdress}
              >
                주소 찾기
              </button>
              <input
                type="text"
                name="adressdetail"
                className="adressdetail"
                autoComplete="off"
                onChange={(e) => {
                  setSignAdressDetail(e.target.value);
                }}
                placeholder="상세주소를 입력해주세요."
              />
            </div>
          </div>
          <button type="submit" className="submit-btn">
            가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Sign;
