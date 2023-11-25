let router = require("express").Router();

//ENV 파일
require("dotenv").config();

// bcrypt(비밀번호 암호화)
const bcrypt = require("bcrypt");

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
  db.collection("user").findOne({ email: req.body.email }, (err, result) => {
    if (err) console.log(err);

    if (!result) {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const sign = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        phone: req.body.phone,
        adress: req.body.adress,
        adressdetail: req.body.adressdetail,
        date: req.body.date,
      };

      db.collection("user").insertOne(sign, (err, result) => {
        if (err) console.log(err);

        return res.status(200).redirect("http://localhost:3000/login");
      });
    } else {
      return res.status(403).json("이미 존재하는 계정입니다.");
    }
  });
});

module.exports = router;
