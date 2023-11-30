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
  db.collection("cart").countDocuments(
    { user: req.body._id },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    }
  );
});

router.post("/list", (req, res) => {
  db.collection("cart")
    .find({ user: req.body._id })
    .toArray((err, restult) => {
      if (err) console.log(err);

      return res.status(200).json(restult);
    });
});

module.exports = router;
