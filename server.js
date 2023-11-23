const express = require("express");
const path = require("path");
const app = express();

// req.body
app.use(express.urlencoded({ extended: true }));

//ENV 파일
require("dotenv").config();

// React Server.js 연결
app.use(express.json());
let cors = require("cors");
app.use(cors());

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
    console.log("db연결");
  }
);
app.listen(process.env.PORT, function () {
  console.log("listening on 8080");
});

// server-react connect
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

// Server Route
app.use("/sign", require("./routes/sign/sign"));

app.get("*", function (req, res) {
  응답.sendFile(path.join(__dirname, "client/build/index.html"));
});
