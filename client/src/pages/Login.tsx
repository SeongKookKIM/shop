import React, { useState } from "react";

function Login() {
  const [emailAlert, setEmailAlert] = useState<string>("");
  const [emailFocus, setEmailFocus] = useState<string>("필수 입력란입니다");
  const [emailChange, setEmailChange] = useState<string>("");

  const [passwordFocus, setPasswordFocus] =
    useState<string>("* 필수 입력란입니다");
  const [passwordChange, setPasswordChange] = useState<string>("");

  const handleEmailFocus = () => {
    setEmailFocus("귀하의 이메일을 입력해주세요.");
    setEmailAlert("email-active");
  };

  const handleEmailBlur = () => {
    if (emailChange.length === 0) {
      setEmailFocus("필수 입력란입니다");
      setEmailAlert("");
    } else {
      setEmailFocus("귀하의 이메일을 입력해주세요.");
      setEmailAlert("email-active");
    }
  };

  const handlePasswordFocus = () => {
    setPasswordFocus("");
  };

  const handlePasswordBlur = () => {
    if (passwordChange.length === 0) {
      setPasswordFocus("* 필수 입력란입니다");
    } else {
      setPasswordFocus("");
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <span>고객님의 계정에 액세스하세요.</span>
        <form>
          <div className="login-email">
            <label htmlFor="email-account">이메일</label>
            <input
              type="text"
              className="email-account"
              id="email-account"
              name="email"
              autoComplete="off"
              onFocus={handleEmailFocus}
              onBlur={handleEmailBlur}
              onChange={(e) => {
                setEmailChange(e.target.value);
              }}
            />
            <span className={emailAlert}>* {emailFocus}</span>
          </div>
          <div className="login-email">
            <label>비밀번호</label>
            <input
              type="password"
              className="password-account"
              name="password"
              autoComplete="off"
              onFocus={handlePasswordFocus}
              onBlur={handlePasswordBlur}
              onChange={(e) => {
                setPasswordChange(e.target.value);
              }}
            />
            <span>{passwordFocus}</span>
          </div>
          <button type="submit">로그인</button>
        </form>

        <div className="find-account">
          <p>비밀번호 찾기</p>
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
