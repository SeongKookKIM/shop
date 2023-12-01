let router = require("express").Router();

//ENV 파일
require("dotenv").config();

// Mongo DB
let db;
const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(
  process.env.MONGO,
  { useUnifiedTopology: true },
  (에러, client) => {
    if (에러) {
      return console.log(에러);
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
      db.collection("cart").insertOne(req.body, (err, restul) => {
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

module.exports = router;
