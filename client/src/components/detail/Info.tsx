import React, { useState } from "react";

function Info() {
  const [infoShow, setInfoShow] = useState<boolean>(false);

  return (
    <div className={`detail-info ${infoShow ? "active" : ""}`}>
      <div className="detail-info-inner">
        <span>혼용률, 세탁 방법 및 원산지</span>
        <span>혼용률</span>
        <span>
          겉감
          <br />
          68% 모직
          <br />
          20% 폴리아미드
          <br />
          10% 캐시미어
          <br />
          2% 기타섬유
        </span>
        <span>
          안감
          <br />
          100% 비스코스
        </span>
        <span>
          겉감
          <br />
          60% RCS 인증된 재활용 울
        </span>
        <span>인증된 소재</span>
        <span>
          RCS 인증된 재활용 울<br />이 소재는 재활용 섬유 폐기물과 사용한 의류를
          사용하여 생산됩니다. 폐기물을 새로운 소재로 전환하는 것은 원자재
          추출을 제한하는 데 도움이 됩니다. 재활용 콘텐츠를 검증하고 원자재에서
          최종 제품이 만들어지기까지의 절차를 모니터링하는 RCS(Recycled Content
          Standard)의 인증을 받았습니다.
        </span>
        <span>관리</span>
        <span>환경을 보호하며 의류를 관리할 수 있습니다</span>
        <span>
          재킷과 코트를 깨끗하게 유지하려면 환기시키고, 천으로 닦거나 의류용
          솔로 솔질해줄 수 있습니다. 드라이클리닝이 필요한 경우, 환경 친화적인
          기술을 사용하는 드라이클리닝 업체를 이용하십시오.{" "}
        </span>
        <div className="item-management">
          <span>- 물세탁 금지</span>
          <span>- 표백제 사용 금지</span>
          <span>- 최고 110도 다림질 가능 </span>
          <span>- 테트라클로로에틸렌 드라이클리닝</span>
          <span>- 건조기 사용 금지</span>
        </div>
      </div>
      <div className="show-hide">
        <span
          onClick={() => {
            setInfoShow(!infoShow);
          }}
        >
          {infoShow ? "숨기기" : "더보기"}
        </span>
      </div>
    </div>
  );
}

export default Info;
