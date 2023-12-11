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

router.post("/newOrder", (req, res) => {
  db.collection("order").countDocuments(
    { status: "상품준비중" },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    }
  );
});

router.post("/newReturn", (req, res) => {
  db.collection("return").countDocuments(
    { status: "반품신청" },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    }
  );
});

router.post("/newInqury", (req, res) => {
  db.collection("contact").countDocuments({ answer: "" }, (err, result) => {
    if (err) console.log(err);

    return res.status(200).json(result);
  });
});

router.post("/totalPrice", (req, res) => {
  db.collection("order")
    .find()
    .toArray((err, result) => {
      if (err) console.log(err);

      if (result) {
        const total = result.reduce(
          (price, item) => price + item.totalPrice,
          0
        );
        return res.status(200).json(total);
      }
    });
});

module.exports = router;
