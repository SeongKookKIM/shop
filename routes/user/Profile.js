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
  db.collection("user").findOne(
    { _id: ObjectId(req.body._id) },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    }
  );
});

module.exports = router;
