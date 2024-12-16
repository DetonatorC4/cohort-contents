const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "HelloIAmAayush";

const app = express();
app.use(express.json());

const users = [];

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  console.log(users);
  res.json({
    msg: "You are signed up",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find((u) => {
    return u.username == username && u.password == password;
  });

  console.log(users);

  if (!foundUser) {
    res.json({
      msg: "Credentials incorrect",
    });
  } else {
    const token = jwt.sign(
      {
        username,
      },
      SECRET_KEY
    );
    res.json({
      token: token,
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, SECRET_KEY);

  if (decodedData.username) {
    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
      if (users[i].username === decodedData.username) {
        foundUser = users[i];
      }
    }

    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  }
});

app.listen(3000);
