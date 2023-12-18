export type UserType = {
  address: string;
  addressdetail: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  _id: string;
  date: string;
  role: string;
};

export type CartType = {
  color: string;
  image: string;
  name: string;
  price: number;
  size: string;
  user: string;
  _id: string;
  count: number;
};

export type ProductType = {
  color: string[];
  description: string;
  mainCategory: string;
  name: string;
  price: number;
  size: string[];
  src: string[];
  subCategory: string;
  thumbnail: string;
  _id: string;
};

export type ProductBuyListType = {
  date: string;
  deliveryNumber: string;
  item: {
    color: string;
    image: string;
    name: string;
    price: number;
    size: string;
    user: string;
    _id: string;
    count: number;
  }[];
  status: string;
  totalPrice: number;
  user: string;
  userAddress: string;
  userAddressDetail: string;
  userEmail: string;
  userMessage: string;
  userName: string;
  userPhone: string;
  _id: string;
};

export type ReturnItemType = {
  user: string;
  name: string;
  phone: string;
  email: string;
  order_id: string;
  returnPrice: number;
  status: string;
  returnNumber: string;
  address: string;
  adressDetail: string;
  date: string;
  item: {
    color: string;
    image: string;
    name: string;
    price: number;
    size: string;
    user: string;
    _id: string;
    count: number;
  }[];
  _id: string;
};

export type InquryType = {
  user: string;
  title: string;
  detail: string;
  imageSrc: string[];
  date: string;
  answer: string;
  _id: string;
};
