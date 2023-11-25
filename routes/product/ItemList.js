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

module.exports = router;
