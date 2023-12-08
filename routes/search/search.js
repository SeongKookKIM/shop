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
  db.collection("product")
    .find()
    .toArray((err, result) => {
      if (err) console.log(err);

      return res.status(200).json(result);
    });
});

// 아이템 찾기
router.post("/item", (req, res) => {
  let search = [
    {
      $search: {
        index: "itemSearch",
        text: {
          query: req.body.value,
          path: [
            "name",
            "price",
            "color",
            "size",
            "itemSearch",
            "mainCategory",
            "subCategory",
          ],
        },
      },
    },
  ];

  db.collection("product")
    .aggregate(search)
    .toArray((err, result) => {
      if (err) return console.log(err);

      return res.status(200).json(result);
    });
});

module.exports = router;
