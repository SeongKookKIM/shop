import React, { ChangeEvent, useRef, useState } from "react";
import { LuArrowRight } from "react-icons/lu";
import { RootState, handlerAdminMenu } from "../../../Store";
import { useDispatch, useSelector } from "react-redux";
import { LuPlusCircle } from "react-icons/lu";
import axios from "axios";

function AdminProductAdd() {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [color, setColor] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [subCategory, setSubCateroty] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //   Image 미리보기 State
  const [thumbnailImage, setThumbnailImage] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<any>();
  const [srcImage, setSrcImage] = useState<string[]>([]);
  const [srcArray, setScrArray] = useState<File[]>([]);

  //   메뉴바
  const adminNav = useSelector((state: RootState) => state.adminNav);
  let dispatch = useDispatch();

  //   색상 값 변경
  const handleChangeColor = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    setColor((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = value;
      return newColors;
    });
  };
  //   사이즈 값 변경
  const handleChangeSize = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;

    setSize((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = value;
      return newColors;
    });
  };

  //   Thumnail
  const thumbnailRef = useRef<HTMLInputElement | null>(null);

  const handleThumbnailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    setThumbnail(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let result = reader.result;
        if (typeof result === "string") {
          setThumbnailImage(result);
        }
      };
    }
  };

  //   Src
  const srcRef = useRef<HTMLInputElement | null>(null);

  const handleSrcChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];

    srcArray.push(file);

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        let result = reader.result;

        if (typeof result === "string") {
          setSrcImage([...srcImage, result]);
        }
      };
    }
  };

  //   Submit
  const handlerProductAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formDataThumbnail = new FormData();
    formDataThumbnail.append("thumbnail", thumbnail);

    let formDataSrc = new FormData();
    for (let i = 0; i < srcArray.length; i++) {
      formDataSrc.append("src", srcArray[i]);
    }

    if (name === "") {
      alert("상품이름을 등록해주세요.");
    } else if (thumbnailImage === "") {
      alert("썸네일을 등록해주세요.");
    } else if (price === undefined) {
      alert("상품가격을 등록해주세요.");
    } else if (color.length === 0) {
      alert("상품색상을 등록해주세요.");
    } else if (size.length === 0) {
      alert("상품사이즈를 등록해주세요.");
    } else if (mainCategory === "") {
      alert("메인카테고리를 등록해주세요.");
    } else if (subCategory === "") {
      alert("서브카테고리를 등록해주세요.");
    } else if (srcImage.length === 0) {
      alert("상세이미지를 한 개이상 등록해주세요.");
    } else {
      axios
        .post("http:///admin/product/thumbnail", formDataThumbnail, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          let thumbSrc = res.data;

          axios
            .post("/admin/product/src", formDataSrc, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then(async (res) => {
              let data = {
                name: name,
                thumbnail: thumbSrc,
                src: res.data,
                price: price,
                color: color,
                size: size,
                description: description,
                mainCategory: mainCategory,
                subCategory: subCategory,
              };

              if (thumbnail) {
                axios
                  .post("/admin/product/add", data)
                  .then((res) => {
                    alert(res.data);
                    window.location.reload();
                  })
                  .catch((err) => console.log(err));
              } else {
                console.log("이미지 등록 오류");
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className={
        adminNav.show ? "admin-product-add" : "admin-product-add active"
      }
    >
      <div className="nav-show">
        {adminNav.show ? (
          ""
        ) : (
          <LuArrowRight
            onClick={() => {
              dispatch(handlerAdminMenu(true));
            }}
          />
        )}
      </div>
      <h6>
        상품등록<span>*모든 항목은 필수 입력사항입니다.</span>
      </h6>

      <div className="add-box">
        <form onSubmit={handlerProductAdd}>
          {/* 이름 */}
          <div className="name">
            <label>상품이름</label>
            <input
              type="text"
              name="name"
              autoComplete="off"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>

          {/* 썸네일 이미지 */}
          <div className="thumbnail">
            <label>썸네일 이미지</label>
            <input
              type="file"
              accept="image/*"
              name="thumbnail"
              multiple={false}
              autoComplete="off"
              ref={thumbnailRef}
              onChange={handleThumbnailChange}
              hidden
            />
            <div
              className="thumbnail-image"
              onClick={() => thumbnailRef.current?.click()}
            >
              <LuPlusCircle />
              {thumbnailImage && <img src={thumbnailImage} alt="thumbnail" />}
            </div>
          </div>

          {/* 가격 */}
          <div className="price">
            <label>가격</label>
            <input
              type="number"
              name="price"
              autoComplete="off"
              placeholder="숫자로 입력해주세요."
              onChange={(e) => {
                let priceNumber = parseInt(e.target.value);
                setPrice(priceNumber);
              }}
            />
          </div>

          {/* 색상 */}
          <div className="color">
            <label>
              색상
              <LuPlusCircle
                onClick={() => {
                  setColor((prevColors) => [...prevColors, ""]);
                }}
              />
            </label>
            {color.map((color, index) => (
              <input
                key={index}
                type="text"
                name={`color-${index}`}
                autoComplete="off"
                placeholder="텍스트로 입력해주세요."
                value={color}
                onChange={(e) => handleChangeColor(e, index)}
              />
            ))}
          </div>

          {/* 사이즈 */}
          <div className="size">
            <label>
              사이즈
              <LuPlusCircle
                onClick={() => {
                  setSize((prevColors) => [...prevColors, ""]);
                }}
              />
            </label>
            {size.map((size, index) => (
              <input
                key={index}
                type="size"
                name={`size-${index}`}
                autoComplete="off"
                placeholder="텍스트로 입력해주세요."
                value={size}
                onChange={(e) => handleChangeSize(e, index)}
              />
            ))}
          </div>

          {/* MainCategory */}
          <div className="maincategory">
            <label>메인 카테고리</label>
            <select
              name="mainCategory"
              onChange={(e) => {
                setMainCategory(e.target.value);
              }}
            >
              <option value="">카테고리를 선택해주세요.</option>
              <option value="all">All</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="home">Home</option>
            </select>
          </div>

          {/* SubCategory */}
          <div className="subcategory">
            <label>서브 카테고리</label>
            <select
              name="subCategory"
              onChange={(e) => {
                setSubCateroty(e.target.value);
              }}
            >
              <option value="">카테고리를 선택해주세요.</option>
              {mainCategory === "all" && (
                <>
                  <option value="coat">coat</option>
                  <option value="best">best</option>
                  <option value="new">new</option>
                  <option value="life">life</option>
                </>
              )}
              {mainCategory === "men" && (
                <>
                  <option value="best">best</option>
                  <option value="new">new</option>
                  <option value="collection">collection</option>
                </>
              )}
              {mainCategory === "women" && (
                <>
                  <option value="best">best</option>
                  <option value="new">new</option>
                  <option value="collection">collection</option>
                </>
              )}
              {mainCategory === "home" && (
                <>
                  <option value="deco">deco</option>
                </>
              )}
            </select>
          </div>

          {/* 상품설명 */}
          <div className="description">
            <label>상품설명</label>
            <textarea
              typeof="text"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          {/* 상품상세 이미지 */}
          <div className="image-src">
            <label>
              상세이미지{" "}
              <LuPlusCircle onClick={() => srcRef.current?.click()} />
            </label>

            <input
              type="file"
              name="src"
              accept="image/*"
              multiple={false}
              ref={srcRef}
              onChange={handleSrcChange}
              hidden
            />
            <div className="image-upload-list">
              <ul>
                {srcImage && srcImage.length > 0 ? (
                  <>
                    {srcImage.map((img, idx) => {
                      return (
                        <li key={idx}>
                          <img src={img} />
                        </li>
                      );
                    })}
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>

          <button type="submit">등록하기</button>
        </form>
      </div>
    </div>
  );
}

export default AdminProductAdd;
