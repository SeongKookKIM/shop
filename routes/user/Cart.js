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

router.post("/list/delete", (req, res) => {
  let findItem = {
    user: req.body.user,
    name: req.body.name,
    color: req.body.color,
    size: req.body.size,
  };
  db.collection("cart").findOne(findItem, (err, result) => {
    if (err) console.log(err);

    if (result) {
      db.collection("cart").deleteOne(findItem, (err, result) => {
        if (err) console.log(err);

        return res.status(200).send("카트에서 해당 상품을 삭제하셨습니다.");
      });
    } else {
      return res.status(403).send("삭제에 실패하셨습니다.");
    }
  });
});

router.post("/delete", (req, res) => {
  db.collection("cart").deleteMany({ user: req.body.user }, (err, result) => {
    if (err) console.log(err);

    return res.status(200).send("해당 cart 삭제");
  });
});

module.exports = router;
