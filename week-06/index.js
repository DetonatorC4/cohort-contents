const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "helloThisIsASecret";

const app = express();
app.use(express.json());

const users = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", logger, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username,
    password,
  });

  res.json({
    message: "You are signed in",
  });
});

app.post("/signin", logger, (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find((u) => {
    return u.username == username && u.password == password;
  });

  if (!foundUser) {
    res.json({
      message: "Credentials Incorrect",
    });
    return;
  } else {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);
  if (decodedData.username) {
    req.username = decodedData.username;
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

function logger(req, res, next) {
  console.log(req.method + " request came");
  next();
}

app.get("/me", auth, logger, (req, res) => {
  const foundUser = users.find((u) => {
    return u.username == req.username;
  });

  res.json({
    username: foundUser.username,
    password: foundUser.password,
  });
});

app.listen(3000, () => {
  console.log("listening");
});
