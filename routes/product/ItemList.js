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

// 상품리스트목록
router.post("/", (req, res) => {
  let findItem = {
    mainCategory: req.body.mainCategory,
    subCategory: req.body.subCategory,
  };
  db.collection("product")
    .find(findItem)
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

// 상품추가
router.post("/add", (req, res) => {
  let findItem = {
    user: req.body.user,
    name: req.body.name,
    color: req.body.color,
    size: req.body.size,
  };
  db.collection("cart").findOne(findItem, (err, result) => {
    if (err) console.log(err);

    if (result) {
      db.collection("cart").updateOne(
        findItem,
        { $inc: { count: req.body.count } },
        (err, result) => {
          if (err) console.log(err);

          return res.status(200).send("cart저장완료");
        }
      );
    } else {
      db.collection("cart").insertOne(req.body, (err, result) => {
        if (err) console.log(err);

        return res.status(200).send("cart저장완료");
      });
    }
  });
});

router.post("/link", (req, res) => {
  db.collection("product").findOne(req.body, (err, result) => {
    if (err) console.log(err);

    return res.status(200).json(result);
  });
});

// 구매상품 목록
router.post("/buylist", (req, res) => {
  db.collection("order")
    .find({ user: req.body._id })
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

// 반품하기
router.post("/order/edit", (req, res) => {
  let find = {
    user: req.body.user._id,
    userName: req.body.user.name,
    item: req.body.findItem,
  };

  let returnlist = {
    user: req.body.return.user,
    name: req.body.return.userName,
    phone: req.body.return.userPhone,
    email: req.body.return.userEmail,
    order_id: req.body.return._id,
    returnPrice:
      Number(req.body.return.totalPrice) - Number(req.body.totalPrice),
    status: "반품신청",
    returnNumber: "",
    address: req.body.return.userAddress,
    adressDetail: req.body.return.userAddressDetail,
    date: `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
    item: req.body.returnItem,
  };

  if (req.body.orderItem.length === 0) {
    db.collection("order").deleteOne(find, (err, result) => {
      if (err) console.log(err);

      if (result) {
        db.collection("return").insertOne(returnlist, (err, result) => {
          if (err) console.log(err);

          return res.status(200).send("반품신청 완료하였습니다.");
        });
      }
    });
  } else {
    db.collection("order").updateOne(
      find,
      { $set: { item: req.body.orderItem, totalPrice: req.body.totalPrice } },
      (err, result) => {
        if (err) console.log(err);

        if (result) {
          db.collection("return").insertOne(returnlist, (err, result) => {
            if (err) console.log(err);

            return res.status(200).send("반품신청 완료하였습니다.");
          });
        }
      }
    );
  }
});

// 반품리스트
router.post("/return", (req, res) => {
  db.collection("return")
    .find({ user: req.body._id })
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

module.exports = router;
