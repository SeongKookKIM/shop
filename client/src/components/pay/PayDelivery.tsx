import React, { useState, useEffect } from "react";
import { UserType } from "../../type/Type";
import { useDispatch, useSelector } from "react-redux";
import { RootState, handlerChangeAddress } from "../../Store";
import { useDaumPostcodePopup } from "react-daum-postcode";

interface UserPropsType {
  handleClose: () => void;
}

function PayDelivery({ handleClose }: UserPropsType) {
  const [userAddress, setUserAddress] = useState<string>("");
  const [userAddressDetail, setuserAddressDetail] = useState<string>("");

  const payAddress = useSelector((state: RootState) => state.payAddress);

  let dispatch = useDispatch();

  useEffect(() => {
    setUserAddress(payAddress.address);
    setuserAddressDetail(payAddress.addressDetail);
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

    setUserAddress(fullAddress);
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

  const handlerChange = () => {
    dispatch(
      handlerChangeAddress({
        address: userAddress,
        addressDetail: userAddressDetail,
      })
    );

    handleClose();
  };

  return (
    <div className="PayDelivery">
      <div className="address-box">
        <label>주소</label>
        <input
          type="text"
          name="address"
          value={userAddress}
          onChange={(e) => {
            setUserAddress(e.target.value);
          }}
        />
      </div>
      <div className="addressdetail-box">
        <label>상세주소</label>
        <input
          type="text"
          name="addressdetail"
          value={userAddressDetail}
          onChange={(e) => {
            setuserAddressDetail(e.target.value);
          }}
        />
      </div>
      <button onClick={handlerFindAddress}>주소찾기</button>
      <button onClick={handlerChange}>변경하기</button>
    </div>
  );
}

export default PayDelivery;
