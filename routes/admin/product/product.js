let router = require("express").Router();
const aws = require("aws-sdk");

// ENV 파일
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

// multer
let multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: null,
  },
});

// AWS S3 설정
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-2",
});
const s3 = new aws.S3();

// thumbnail 업로드 (AWS S3 사용)
router.post("/thumbnail", upload.single("thumbnail"), (req, res) => {
  if (!req.file) {
    res.status(200).send("No file uploaded.");
    return;
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `thumbnail/${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
  };

  s3.upload(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.status(200).send(data.Location);
  });
});

// 여러 이미지 업로드 (AWS S3 사용)
router.post("/src", upload.array("src"), async (req, res) => {
  let urls = [];

  for (const file of req.files) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `src/${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      const data = await s3.upload(params).promise();
      urls.push(data.Location);
    } catch (err) {
      console.error(err);
      return res.status(500).send(err);
    }
  }

  res.status(200).send(urls);
});

// 상품리스트
router.post("/list", (req, res) => {
  if (req.body.main === "" && req.body.sub === "") {
    db.collection("product")
      .find()
      .toArray((err, result) => {
        if (err) console.log(err);

        return res.status(200).json(result);
      });
  } else if (req.body.main !== "" && req.body.sub === "") {
    db.collection("product")
      .find({ mainCategory: req.body.main })
      .toArray((err, result) => {
        if (err) console.log(err);

        return res.status(200).json(result);
      });
  } else {
    db.collection("product")
      .find({ mainCategory: req.body.main, subCategory: req.body.sub })
      .toArray((err, result) => {
        if (err) console.log(err);

        return res.status(200).json(result);
      });
  }
});

// 상품추가
router.post("/add", (req, res) => {
  db.collection("product").insertOne(req.body, (err, result) => {
    if (err) console.log(err);

    return res.status(200).send("상품을 등록하셨습니다.");
  });
});

// 상품삭제하기
router.post("/delete", (req, res) => {
  db.collection("product").deleteOne(
    { _id: ObjectId(req.body._id) },
    (err, result) => {
      if (err) console.log(err);
      return res.status(200).send("해당 상품을 삭제하셨습니다.");
    }
  );
});

// 상품수정하기
router.post("/edit", (req, res) => {
  db.collection("product").updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
    },
    (err, result) => {
      if (err) console.log(err);

      return res.status(200).send("상품 정보를 수정하셨습니다.");
    }
  );
});

module.exports = router;
