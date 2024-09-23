# Shop - 쇼핑몰 프로젝트

이 프로젝트는 실제 쇼핑몰에서 사용되는 전반적인 기능을 모두 구현한 프로젝트로, 쇼핑몰 운영을 위한 백오피스(관리자)와 일반 사용자가 이용하는 클라이언트(사용자) 부분을 모두 포함하고 있습니다. 관리자와 사용자가 각각 필요한 기능들을 직관적이고 효율적으로 사용할 수 있도록 설계되었습니다.

서비스 링크: http://43.200.204.67/ (현재 AWS EC2 탄력적IP만 설정)

### [`Admin Account`]

- Admin Account 로그인 후 상단 우측 admin 클릭 후 관리자 페이지 클릭시 Admin Page로 이동 가능합니다.

```bash
ID: admin@shop.com

PW: Admin123@
```

## 백오피스(관리자) 부분

백오피스는 쇼핑몰 운영자가 사용자와 상품, 주문, 재고, 고객 문의 등을 관리할 수 있는 시스템입니다. 이를 통해 관리자는 쇼핑몰 운영과 관련된 다양한 업무를 한 곳에서 손쉽게 처리할 수 있습니다. 주요 기능은 다음과 같습니다:

### 1. 요약 페이지

<p align="center">
  <img src="https://github.com/user-attachments/assets/633bcbd2-b6b9-414e-b38c-4eb851a95ea3" alt="이미지1 설명" width="90%" />
</p>

- **주요 정보 요약**: 백오피스에 처음 접속하면 관리자는 처리되지 않은 주문, 반품, 정산 예정 금액, 신규 고객 문의 등의 요약 정보를 한눈에 확인할 수 있는 대시보드를 제공합니다. 이를 통해 빠른 의사결정이 가능합니다.

### 2. 회원 관리

<p align="center">
  <img src="https://github.com/user-attachments/assets/aa91c529-f678-4bca-8ab2-892adf8c6a5b" alt="회원관리 설명" width="45%" />
    <img src="https://github.com/user-attachments/assets/df0d3a8f-73b4-43f1-8486-d88bf6ed8d53" alt="회원관리 설명" width="45%" />
</p>

- **회원 정보 조회 및 수정**: 관리자는 쇼핑몰에 가입한 모든 회원의 정보를 조회할 수 있으며, 회원의 개인 정보(이름, 연락처, 이메일 등)를 수정하거나 삭제할 수 있습니다.
- **주문 및 반품 내역 확인**: 특정 회원의 주문 내역, 반품 내역을 조회하고, 해당 회원이 이전에 남긴 고객 문의 내용도 함께 확인할 수 있습니다. 이를 통해 고객별 맞춤형 서비스를 제공할 수 있습니다.

### 3. 상품 관리

<p align="center">
  <img src="https://github.com/user-attachments/assets/efb6a741-1981-4144-a7d7-aaa576d2ade5" alt="회원관리 설명" width="45%" />
    <img src="https://github.com/user-attachments/assets/e56ca3ec-cf18-40de-87c6-0e9530d24f2d" alt="회원관리 설명" width="45%" />
</p>

- **상품 등록 및 수정**: 관리자는 새로운 상품을 등록할 수 있으며, 상품의 이름, 설명, 가격, 이미지, 재고 수량 등을 관리할 수 있습니다. 기존 상품의 정보를 수정하거나, 더 이상 판매하지 않는 상품은 삭제할 수도 있습니다.
- **상품 관리의 효율성**: 상품 정보는 카테고리별로 관리되어, 관리자가 원하는 상품을 빠르게 찾고 수정할 수 있도록 했습니다.

### 4. 주문 관리

<p align="center">
  <img src="https://github.com/user-attachments/assets/704f0f52-c513-4e4f-90e4-3dadfd34f72e" alt="회원관리 설명" width="45%" />
    <img src="https://github.com/user-attachments/assets/da13c15d-1513-47eb-8241-673df094b10d" alt="회원관리 설명" width="45%" />
</p>

- **주문 내역 조회 및 처리**: 관리자는 모든 주문을 실시간으로 조회할 수 있으며, 주문의 상태를 처리 중, 배송 중, 배송 완료 등으로 변경할 수 있습니다.
- **배송 관리**: 주문이 접수되면 배송 요청을 확인하고, 고객의 요구사항을 반영해 배송 절차를 진행합니다. 관리자는 송장 번호를 입력하여 고객이 배송 상태를 추적할 수 있도록 합니다.
- **반품 관리**: 반품 요청이 접수되면, 관리자는 반품 상태(반품 신청, 반품 진행, 반품 완료)를 변경할 수 있으며, 반품 진행 과정에서 발생하는 송장 번호를 입력하여 반품 절차를 체계적으로 관리합니다.

### 5. 고객 문의 관리

<p align="center">
  <img src="https://github.com/user-attachments/assets/62acaebc-e2ff-46df-bdb1-0fb7a0aff6c0" alt="회원관리 설명" width="45%" />
    <img src="https://github.com/user-attachments/assets/f021d388-1d5f-4417-bc29-5bb2392290f1" alt="회원관리 설명" width="45%" />
</p>

- **실시간 문의 처리**: 고객이 쇼핑몰을 통해 남긴 문의를 실시간으로 확인할 수 있으며, 즉각적으로 답변을 달 수 있는 시스템이 구현되었습니다. 관리자는 문의 내용을 유형별로 필터링하여 보다 효율적으로 처리할 수 있습니다.
- **답변 관리**: 관리자가 이미 처리한 문의와 아직 처리하지 않은 문의를 한눈에 볼 수 있으며, 이를 통해 신속한 고객 응대가 가능합니다.

**재고 관리 시스템(추후 추가 예정)**: 향후 재고 관리 시스템이 추가되어 실시간으로 상품의 재고를 확인하고, 재고 부족 시 알림을 받을 수 있는 기능이 추가될 예정입니다.

## 클라이언트(사용자) 부분

일반 사용자가 쇼핑몰을 이용하는 과정에서 필요한 회원가입부터 상품 검색, 주문, 결제, 반품 요청까지 모든 과정을 구현했습니다. 사용자 경험을 중시하여 직관적인 인터페이스와 원활한 결제 절차를 제공하며, 주요 기능은 다음과 같습니다

### 1. **회원가입 및 로그인**

   <p align="center">
     <img src="https://github.com/user-attachments/assets/704774a0-9aee-4354-8c47-eda2dc6cb7bd" alt="회원관리 설명" width="30%" />
     <img src="https://github.com/user-attachments/assets/7e711a73-598b-4d6a-a904-247b18f1c4d7" alt="회원관리 설명" width="30%" />
     <img src="https://github.com/user-attachments/assets/b057fa61-754f-4e0f-8abb-e29d817c11d3" alt="회원관리 설명" width="30%" />
   </p>

- 사용자는 이메일과 비밀번호를 입력해 유효성 검사를 거쳐 회원가입을 할 수 있으며, 비밀번호는 암호화된 후 복호화가 불가능한 형태로 안전하게 데이터베이스에 저장됩니다. 또한, 주소 찾기 기능이 추가되어 회원가입 시 더욱 편리하게 주소를 입력할 수 있습니다.

### 2. **상품 검색 및 주문**

   <p align="center">
     <img src="https://github.com/user-attachments/assets/2488af85-2747-4b6d-91d6-d730fcfc475a" alt="회원관리 설명" width="30%" />
     <img src="https://github.com/user-attachments/assets/4c0dd76c-5f4e-4b03-89d1-1ee924989691" alt="회원관리 설명" width="30%" />
     <img src="https://github.com/user-attachments/assets/bea88eb9-6a24-4f3d-a830-a0e351fba6e8" alt="회원관리 설명" width="30%" />
   </p>
   <p align="center">
    <img src="https://github.com/user-attachments/assets/d1792748-daee-440f-9d01-04f5a83255ed" alt="회원관리 설명" width="45%" />
    <img src="https://github.com/user-attachments/assets/9a125eaa-a544-4e72-bca2-d1ac94ba09b1" alt="회원관리 설명" width="45%" />
   </p>

- 사용자는 원하는 상품을 검색하고, 선택한 상품을 장바구니에 추가한 후 결제 절차를 통해 구매할 수 있습니다. 결제 과정은 실제 결제 API와 연동되어 있어 사용자에게 실제 쇼핑 경험을 제공합니다.

### 3. **마이페이지 기능**

<p align="center">
  <img src="https://github.com/user-attachments/assets/2d017826-3aed-438b-b46f-17b6ef1b37a9" alt="이미지1 설명" width="90%" />
</p>

- 마이페이지에서는 사용자의 주문 내역, 반품 내역을 확인하고, 반품을 신청할 수 있는 기능도 제공됩니다. 또한, 회원 정보 수정 기능도 제공하여 개인정보를 쉽게 관리할 수 있습니다.

### 4. **고객 문의 및 리뷰**

<p align="center">
    <img src="https://github.com/user-attachments/assets/c13e08ae-7a62-4ef1-8f4f-50410f1ea042" alt="회원관리 설명" width="45%" />
    <img src="https://github.com/user-attachments/assets/2181e78a-9742-4909-9ffc-2c668ba5440c" alt="회원관리 설명" width="45%" />
</p>

- 사용자는 쇼핑몰 이용 중 궁금한 사항이 있을 경우 고객 문의를 남길 수 있으며, 관리자의 답변을 실시간으로 확인할 수 있습니다. 구매한 상품에 대한 리뷰를 작성하고 다른 사용자의 리뷰를 참고할 수도 있습니다.

이 프로젝트는 프론트엔드와 백엔드 양쪽에서 쇼핑몰 운영에 필요한 모든 기능을 직접 구현한 프로젝트로, 실제 상용화 환경에서도 바로 적용할 수 있는 구조로 설계되었습니다. 전체적인 사용자 경험을 개선하고, 관리자의 업무 효율성을 높이는 데 중점을 두었으며, 향후 재고 관리 기능 등 추가적인 기능 확장을 통해 더욱 완성도 높은 시스템으로 발전시킬 계획입니다.

<br/>

## 개발도구 및 스텍

### 개발 환경

- **Node.js**: 14.x
- **Yarn**: 1.22.22

### 기술 스택

- **Server**: Express
- **Database**: MongoDB

### Dependencies

- **Node.js**
  - TypeScript: 5.5.4
  - Express: 4.19.2
  - React: 18.2.0

### 서버 설정 및 배포

- **서버 설치**: npm install
- **서버 실행**: npm start
- **배포 환경**: Dokcker + AWS EC2

<br/>

## 트러블 슈팅

1. **모바일 결제 문제**

   - iamport API를 사용하여 웹 브라우저에서는 결제가 정상적으로 진행되었지만, 모바일 환경에서는 결제가 진행되지 않는 문제가 발생했습니다. 이를 해결하기 위해 모바일 결제 페이지를 따로 분리하고, 리다이렉트 URL을 해당 페이지로 설정하여 모바일 결제가 원활히 진행되도록 문제를 해결했습니다.

2. **서버와 클라이언트의 언어 차이**

   - 클라이언트 부분은 Typescript로 개발되었으나, 서버는 Javascript로 작성되어 있습니다. 코드 일관성과 유지보수성을 높이기 위해, 추후 서버 부분도 Typescript로 마이그레이션할 예정입니다.

3. **배포 환경과 이미지 서버 변경**

   - 처음에는 GCP AppEngine과 버킷을 사용하여 배포 및 이미지 서버를 구성하고 Node.js 14.x 버전을 사용했습니다. 그러나 GCP 무료 사용이 종료됨에 따라 Docker와 AWS EC2를 이용한 배포로 전환하였으며, 이미지 서버는 AWS S3로 변경했습니다. Node.js 버전은 추후 업그레이드할 계획입니다.

4. **SCSS 코드 가독성 문제**
   - SCSS를 사용하여 스타일을 관리하였으나, 페이지별로 스타일 모듈을 분리하지 않아 코드의 가독성이 떨어졌습니다. 이를 개선하기 위해, 추후 페이지별로 SCSS 파일을 분리하여 관리할 예정입니다.
