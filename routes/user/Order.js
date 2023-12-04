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

router.post("/", (req, res) => {
  db.collection("order").insertOne(req.body, (err, result) => {
    if (err) console.log(err);

    return res.status(200).send("구매 성공하셨습니다.");
  });
});

module.exports = router;
