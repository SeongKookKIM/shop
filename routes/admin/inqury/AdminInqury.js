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
  db.collection("contact")
    .find()
    .toArray((err, result) => {
      if (err) console.log(err);

      if (req.body.status === "답변대기") {
        const inquryResult = result.filter((inqury) => inqury.answer === "");

        return res.status(200).json(inquryResult);
      } else if (req.body.status === "답변완료") {
        const inquryResult = result.filter((inqury) => inqury.answer !== "");

        return res.status(200).json(inquryResult);
      } else {
        return res.status(403).send("문의리스트 불러오기 오류");
      }
    });
});

router.post("/answer", (req, res) => {
  db.collection("contact").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        answer: req.body.answer,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("문의 글에 답변하였습니다.");
    }
  );
});

module.exports = router;
