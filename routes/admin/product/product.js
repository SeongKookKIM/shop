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

// multer
let multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: null,
  },
});

// GCP
const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "image-cloud-398905",
  keyFilename: "./shop-406211-300b62e67fb3.json",
});
const bucket = storage.bucket("sam-shop-image");

const util = require("util");
const format = util.format;

// 상품추가
router.post("/add", (req, res) => {
  db.collection("product").insertOne(req.body, (err, result) => {
    if (err) console.log(err);

    return res.status(200).send("상품을 등록하셨습니다.");
  });
});

// thumbnail
router.post("/thumbnail", upload.single("thumbnail"), (req, res) => {
  if (!req.file) {
    res.status(200).send("No file uploaded.");
    return;
  }

  const blob = bucket.file(`thumbnail/${req.file.originalname}`);

  const blobStream = blob.createWriteStream();

  blobStream.on("error", (err) => {
    console.error(err);
    res.status(500).send(err);
  });

  blobStream.on("finish", () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    );

    res.status(200).send(publicUrl);
  });

  blobStream.end(req.file.buffer);
});

// Src
router.post("/src", upload.array("src"), async (req, res) => {
  let urls = [];

  for (const file of req.files) {
    const blob = bucket.file(`src/${file.originalname}`);
    const blobStream = blob.createWriteStream();

    await new Promise((resolve, reject) => {
      blobStream.on("error", (err) => {
        console.error(err);
        reject(err);
      });

      blobStream.on("finish", () => {
        const publicUrl = format(
          `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        urls.push(publicUrl);

        resolve();
      });

      blobStream.end(file.buffer);
    });
  }

  res.status(200).send(urls);
});

module.exports = router;
