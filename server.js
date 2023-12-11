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
  (err, client) => {
    if (err) {
      return console.log(err);
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
app.use("/sign", require("./routes/sign/Sign"));
app.use("/login", require("./routes/login/Login"));
app.use("/product", require("./routes/product/ItemList"));
app.use("/cart", require("./routes/user/Cart"));
app.use("/order", require("./routes/user/Order"));
app.use("/profile", require("./routes/user/Profile"));
app.use("/inqury", require("./routes/user/Inqury"));
app.use("/search", require("./routes/search/search"));
app.use("/admin/home", require("./routes/admin/home/AdminHome"));

app.get("*", function (req, res) {
  응답.sendFile(path.join(__dirname, "client/build/index.html"));
});
