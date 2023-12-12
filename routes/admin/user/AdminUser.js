let router = require("express").Router();

//ENV 파일
require("dotenv").config();

// Mongo DB
let db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  process.env.MONGO,
  { useUnifiedTopology: true },
  (err, client) => {
    if (err) {
      return console.log(err);
    }
    db = client.db("shop");
  }
);
const { ObjectId } = require("mongodb");

// 유저 리스트 불러오기
router.post("/", (req, res) => {
  db.collection("user")
    .find()
    .toArray((err, result) => {
      if (err) console.log(err);

      let data = result.filter((user) => user.role !== "admin");

      return res.status(200).json(data);
    });
});

// 유저 삭제
router.post("/delete", (req, res) => {
  console.log(req.body);
  db.collection("user").deleteOne(
    { _id: ObjectId(req.body._id) },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("유저정보를 삭제하셨습니다.");
    }
  );
});

//유저정보 불러오기
router.post("/info", (req, res) => {
  db.collection("user").findOne(
    { _id: ObjectId(req.body._id) },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    }
  );
});

// 유저 주문목록
router.post("/order", (req, res) => {
  db.collection("order")
    .find({ user: req.body._id })
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

// 유저 반품 목록
router.post("/return", (req, res) => {
  db.collection("return")
    .find({ user: req.body._id })
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

// 유저 문의 목록
router.post("/inqury", (req, res) => {
  db.collection("contact")
    .find({ user: req.body._id })
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

module.exports = router;
