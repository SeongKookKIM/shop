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

router.post("/image", upload.array("src"), (req, res) => {
  console.log(req.files);
  //   const blob = bucket.file(req.file.originalname);

  //   const blobStream = blob.createWriteStream();

  //   blobStream.on("error", (err) => {
  //     console.error(err);
  //     res.status(500).send(err);
  //   });

  //   blobStream.on("finish", () => {
  //     const publicUrl = format(
  //       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  //     );

  //     res.status(200).send(publicUrl);
  //   });

  //   blobStream.end(req.file.buffer);
  let urls = [];

  for (let i = 0; i < req.files.length; i++) {
    const blob = bucket.file(req.files[i].originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error(err);
      res.status(500).send(err);
      return;
    });

    blobStream.on("finish", () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      urls.push(publicUrl);

      // If it was the last file then send response
      if (i === req.files.length - 1) {
        res.status(200).send(urls);
        return;
      }
    });

    blobStream.end(req.files[i].buffer);
  }
});

module.exports = router;
