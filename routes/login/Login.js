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
  (에러, client) => {
    if (에러) {
      return console.log(에러);
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

function loginConfrim(요청, 응답, next) {
  if (요청.user) {
    next(); //통과
  } else {
    응답.send("로그인을 안하셨습니다.");
  }
}

router.post("/", passport.authenticate("local"), function (요청, 응답) {
  if (요청.user) {
    return 응답.status(200).json(요청.user);
  } else {
    return 응답.status(401).json({ message: "로그인 실패" });
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
    function (입력한아이디, 입력한비번, done) {
      db.collection("user").findOne(
        { email: 입력한아이디 },
        function (에러, 결과) {
          if (에러) return done(에러);

          if (!결과) {
            return done(null, false, { message: "존재하지않는 이메일입니다." });
          } else {
            const result = bcrypt.compareSync(입력한비번, 결과.password);

            if (result) {
              return done(null, 결과);
            } else {
              return done(null, false, { message: "비밀번호가 틀렸습니다." });
            }
          }
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.email);
});

passport.deserializeUser(function (아이디, done) {
  db.collection("user").findOne({ email: 아이디 }, function (에러, 결과) {
    done(null, 결과);
  });
});

module.exports = router;
