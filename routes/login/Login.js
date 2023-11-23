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

// Passport
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());

router.post("/", passport.authenticate("local"), function (req, res) {
  if (req.user) {
    return res.status(200).json(req.user);
  } else {
    return res.status(401).json({ message: "로그인에 실패하였습니다." });
  }
});

// 정보 검사
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    function (enterEmail, enterPassword, done) {
      db.collection("user").findOne({ email: enterEmail }, function (err, res) {
        if (err) return done(err);

        if (!res) {
          return done(null, false, { message: "존재하지않는 이메일입니다." });
        } else {
          const result = bcrypt.compareSync(enterPassword, res.password);

          if (result) {
            return done(null, res);
          } else {
            return done(null, false, { message: "비밀번호가 틀렸습니다." });
          }
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (enterEmail, done) {
  db.collection("user").findOne({ email: enterEmail }, function (err, result) {
    done(null, result);
  });
});

module.exports = router;
