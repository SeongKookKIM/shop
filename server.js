const express = require("express");
const path = require("path");
const app = express();

// req.body
app.use(express.urlencoded({ extended: true }));

//ENV 파일
require("dotenv").config();

// bcrypt(비밀번호 암호화)
const bcrypt = require("bcrypt");

// React Server.js 연결
app.use(express.json());
let cors = require("cors");
app.use(cors());

// Mongo DB
const { MongoClient } = require("mongodb");

let db;
new MongoClient(process.env.MONGO)
  .connect()
  .then((client) => {
    console.log("DB연결성공");
    db = client.db("shop");

    app.listen(process.env.PORT, function () {
      console.log("listening on 8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
const { ObjectId } = require("mongodb");

// server-react connect
app.use(express.static(path.join(__dirname, "client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.get("*", function (req, res) {
  응답.sendFile(path.join(__dirname, "client/build/index.html"));
});
