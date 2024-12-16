const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Hello I'm Aayush";

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

  res.send({
    message: "You have signed up!",
  });

  console.log(users);
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const foundUser = users.find((u) => {
    if (u.username == username && u.password == password) {
      return true;
    } else {
      return false;
    }
  });

  if (foundUser) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    // foundUser.token = token;
    res.send({
      token,
    });
    console.log(users);
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }
});

app.get("/me", (req, res) => {
  const token = req.header.token;
  const decodedInformation = jwt.verify(token, JWT_SECRET);
  const username = decodedInformation.username;

  const user = users.find((user) => user.username == username);

  if (user) {
    res.send({
      username: user.username,
    });
  } else {
    res.status(401).send({
      msg: "unauthorized",
    });
  }
});

app.listen(3000, () => {
  console.log("Listening");
});
