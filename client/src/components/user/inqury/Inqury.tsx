import axios from "axios";
import React, { useRef, useState, ChangeEvent } from "react";
import { LuPlusCircle } from "react-icons/lu";

function Inqury() {
  const [imageArray, setImageArray] = useState<string[]>([]);

  const [newFileArray, setNewFileArray] = useState<File[]>([]);

  //   const [fileSrc, setFileSrc] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  //   File이미지 변경(배열에 닮기)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];

    newFileArray.push(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      //   setFileSrc(file);

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

    axios
      .post("http://localhost:8080/inqury/image", formDataSrc, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="inqury">
      <form
        action="http://localhost:8080/inqury"
        method="POST"
        onSubmit={(e) => {
          handlerInqury(e);
        }}
      >
        <div className="title">
          <label>제목</label>
          <input type="text" name="title" autoComplete="off" />
        </div>
        <div className="detail">
          <label>문의 내용</label>
          <textarea typeof="text" name="detail" autoComplete="off" />
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
            {imageArray && (
              <>
                {imageArray.map((it, i) => {
                  return <img key={i} src={it} />;
                })}
              </>
            )}
          </div>
        </div>
        <button type="submit">문의하기</button>
      </form>
    </div>
  );
}

export default Inqury;
