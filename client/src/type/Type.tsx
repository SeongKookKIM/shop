export type userType = {
  adress: string;
  adressdetail: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  _id: string;
};

export type cartType = {
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
