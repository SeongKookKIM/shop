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

router.post("/", (req, res) => {
  db.collection("order")
    .find(req.body)
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

router.post("/edit", (req, res) => {
  db.collection("order").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        status: req.body.status,
        deliveryNumber: req.body.deliveryNumber,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("상품 정보를 수정하셨습니다.");
    }
  );
});
module.exports = router;
