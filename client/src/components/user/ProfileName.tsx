import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";

interface UserPropsType {
  userInfo: UserType | undefined;
  setProfileEdit: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileName({ userInfo, setProfileEdit }: UserPropsType) {
  const [nameEdit, setNameEdit] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setNameEdit(userInfo.name);
    }
  }, []);

  const handlerNameEdit = () => {
    if (nameEdit === "") {
      alert("이름을 적어주세요.");
    } else {
      if (window.confirm("이름을 변경하시겠습니까?")) {
        axios
          .post("http://localhost:8080/profile/edit/name", {
            _id: userInfo?._id,
            name: nameEdit,
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
    <div className="profile-edit-name">
      <LuArrowLeft
        className="back"
        onClick={() => {
          setProfileEdit("all");
        }}
      />
      <p>이름</p>
      <input
        type="text"
        name="name"
        autoComplete="off"
        value={nameEdit}
        onChange={(e) => {
          setNameEdit(e.target.value);
        }}
        required
      ></input>
      <div className="change-btn">
        <span onClick={handlerNameEdit}>변경하기</span>
      </div>
    </div>
  );
}

export default ProfileName;
