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
  (err, client) => {
    if (err) {
      return console.log(err);
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
        address: req.body.address,
        addressdetail: req.body.addressdetail,
        date: req.body.date,
      };

      db.collection("user").insertOne(sign, (err, result) => {
        if (err) console.log(err);

        return res.status(200).redirect("/login");
      });
    } else {
      return res.status(403).json("이미 존재하는 계정입니다.");
    }
  });
});

module.exports = router;
