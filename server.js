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
app.use("/sign", require("./routes/sign/sign"));
app.use("/login", require("./routes/login/Login"));
app.use("/product", require("./routes/product/ItemList"));
app.use("/cart", require("./routes/user/Cart"));
app.use("/order", require("./routes/user/Order"));
app.use("/profile", require("./routes/user/Profile"));
app.use("/inqury", require("./routes/user/Inqury"));
app.use("/search", require("./routes/search/search"));
app.use("/admin/home", require("./routes/admin/home/AdminHome"));
app.use("/admin/user", require("./routes/admin/user/AdminUser"));
app.use("/admin/product", require("./routes/admin/product/product"));
app.use("/admin/delivery", require("./routes/admin/delivery/Delivery"));
app.use("/admin/return", require("./routes/admin/delivery/Return"));
app.use("/admin/inqury", require("./routes/admin/inqury/AdminInqury"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});
