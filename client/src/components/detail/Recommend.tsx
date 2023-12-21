import React, { useEffect, useState } from "react";
import { ProductType } from "../../type/Type";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Recommend() {
  const [recommendList, setRecommendList] = useState<ProductType[]>([]);

  let navigate = useNavigate();

  useEffect(() => {
    axios
      .post("/product/recommend")
      .then((res) => {
        setRecommendList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="recommend">
      <strong>추천제품</strong>
      <div className="recommend-list">
        <ul>
          {recommendList && recommendList.length > 0 ? (
            <>
              {recommendList.map((it, i) => {
                return (
                  <li
                    key={i}
                    onClick={() => {
                      navigate(`/detail/${it._id}`, { state: { it } });
                    }}
                  >
                    <div className="recommend-image">
                      <img src={it.thumbnail} />
                    </div>
                    <div className="recommend-info-wrapper">
                      <div className="recommend-info">
                        <p>{it.name}</p>
                        <span>{it.price.toLocaleString()} 원</span>
                      </div>
                    </div>
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
  );
}

export default Recommend;
