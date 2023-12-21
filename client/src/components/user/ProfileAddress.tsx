import React, { useEffect, useState } from "react";
import { UserType } from "../../type/Type";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";
import { LuArrowLeft } from "react-icons/lu";

interface UserPropsType {
  userInfo: UserType | undefined;
  setProfileEdit: React.Dispatch<React.SetStateAction<string>>;
}

function ProfileAddress({ userInfo, setProfileEdit }: UserPropsType) {
  const [addressEdit, setAddressEdit] = useState<string>("");
  const [addressDetailEdit, setAddressDetailEdit] = useState<string>("");

  useEffect(() => {
    if (userInfo) {
      setAddressEdit(userInfo.address);
      setAddressDetailEdit(userInfo.addressdetail);
    }
  }, []);

  // 주소API
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

    setAddressEdit(fullAddress);
  };

  const handlerFindAddress = () => {
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

  const handlerAddressEdit = () => {
    if (addressEdit === "") {
      alert("주소를 입력해주세요.");
    } else {
      if (window.confirm("주소를 변경하시겠습니까?")) {
        axios
          .post("/profile/edit/address", {
            _id: userInfo?._id,
            address: addressEdit,
            addressdetail: addressDetailEdit,
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
    <div className="profile-edit-address">
      <LuArrowLeft
        className="back"
        onClick={() => {
          setProfileEdit("all");
        }}
      />
      <p>주소</p>
      <input
        type="text"
        name="address"
        autoComplete="off"
        value={addressEdit}
        onChange={(e) => {
          setAddressEdit(e.target.value);
        }}
        required
      ></input>
      <input
        type="text"
        name="address"
        value={addressDetailEdit}
        onChange={(e) => {
          setAddressDetailEdit(e.target.value);
        }}
      ></input>
      <div className="change-btn">
        <span onClick={handlerFindAddress}>주소찾기</span>
        <span onClick={handlerAddressEdit}>변경하기</span>
      </div>
    </div>
  );
}

export default ProfileAddress;
