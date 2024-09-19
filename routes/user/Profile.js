let router = require("express").Router();

//ENV 파일
require("dotenv").config();

const bcrypt = require("bcryptjs");

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

router.post("/delete", (req, res) => {
  db.collection("user").deleteOne(
    { _id: ObjectId(req.body._id) },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("귀하의 계정을 삭제하였습니다.");
    }
  );
});

router.post("/edit/name", (req, res) => {
  db.collection("user").updateOne(
    { _id: ObjectId(req.body._id) },
    { $set: { name: req.body.name } },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("이름을 변경하셨습니다.");
    }
  );
});

router.post("/edit/address", (req, res) => {
  db.collection("user").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        address: req.body.address,
        addressdetail: req.body.addressdetail,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("주소를 변경하셨습니다.");
    }
  );
});

router.post("/edit/email", (req, res) => {
  db.collection("user").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        email: req.body.email,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("이메일을 변경하셨습니다.");
    }
  );
});

router.post("/edit/phone", (req, res) => {
  db.collection("user").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        phone: req.body.phone,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("연락처를 변경하셨습니다.");
    }
  );
});

router.post("/edit/password", (req, res) => {
  const hashed = bcrypt.hashSync(req.body.password, 10);

  db.collection("user").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        password: hashed,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("비밀번호를 변경하셨습니다.");
    }
  );
});

router.post("/edit/password/confirm", (req, res) => {
  db.collection("user").findOne(
    { _id: ObjectId(req.body._id) },
    async (err, result) => {
      if (err) console.log(err);

      const passwordMatch = await bcrypt.compare(
        req.body.password,
        result.password
      );

      if (passwordMatch) {
        return res.status(200).send("비밀번호 확인");
      } else {
        return res.status(403).send("비밀번호가 틀렸습니다");
      }
    }
  );
});

module.exports = router;
