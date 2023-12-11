import axios from "axios";
import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { LuPlusCircle } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft } from "react-icons/lu";

import { UserType } from "../../../type/Type";
import SubMenu from "../../menu/SubMenu";
import Footer from "../../footer/Footer";

function Inqury() {
  const [userInfo, setUserInfo] = useState<UserType>();

  const [imageArray, setImageArray] = useState<string[]>([]);
  const [newFileArray, setNewFileArray] = useState<File[]>([]);

  // DbData
  const [title, setTitle] = useState<string>("");
  const [detail, setDetail] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  let navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("user");

    if (localUser) {
      setUserInfo(JSON.parse(localUser));
    }
  }, []);

  //   File이미지 변경(배열에 닮기)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];

    newFileArray.push(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let result = reader.result;

        if (typeof result === "string") {
          setImageArray([...imageArray, result]);
        }
      };
    }
  };

  const handlerInqury = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formDataSrc = new FormData();
    for (let i = 0; i < newFileArray.length; i++) {
      formDataSrc.append("src", newFileArray[i]);
    }

    if (title === "") {
      alert("제목을 적어주세요.");
    } else if (detail === "") {
      alert("문의내용을 적어주세요.");
    } else {
      if (window.confirm("문의하시겠습니까?")) {
        axios
          .post("http://localhost:8080/inqury/image", formDataSrc, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            let inquryData = {
              user: userInfo?._id,
              title: title,
              detail: detail,
              date: `${new Date().getFullYear()}-${
                new Date().getMonth() + 1
              }-${new Date().getDate()}`,
              imageSrc: res.data,
              answer: "",
            };

            axios
              .post("http://localhost:8080/inqury/add", inquryData)
              .then((res) => {
                alert(res.data);
                navigate("/contact");
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => console.log(err));
      } else {
        return;
      }
    }
  };

  return (
    <div className="inqury">
      <SubMenu />
      <LuArrowLeft className="back" onClick={() => navigate(-1)} />
      <form
        onSubmit={(e) => {
          handlerInqury(e);
        }}
      >
        <div className="title">
          <label>제목</label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="detail">
          <label>문의 내용</label>
          <textarea
            typeof="text"
            name="detail"
            autoComplete="off"
            onChange={(e) => setDetail(e.target.value)}
          />
        </div>
        <div className="image-upload">
          <label>이미지 첨부</label>
          <div
            className="add-image"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              name="src"
              accept="image/*"
              multiple={false}
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            />
            <span>
              <LuPlusCircle />
            </span>
          </div>
          <div className="image-list">
            {imageArray && imageArray.length > 0 ? (
              <>
                {imageArray.map((it, i) => {
                  return <img key={i} src={it} />;
                })}
              </>
            ) : (
              <div className="no-image">
                <span>이미지를 추가해주세요</span>
              </div>
            )}
          </div>
        </div>
        <button type="submit">문의하기</button>
      </form>
      <Footer classPadding="active" />
    </div>
  );
}

export default Inqury;
