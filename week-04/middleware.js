const express = require("express");
const app = express();

function isOldEnough(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.status(411).json({ msg: "Sorry! You are not of age yet" });
  }
}

app.use(isOldEnough);

app.get("/ride1", (req, res) => {
  res.json({ msg: "You have successfully riden ride 1" });
});

app.get("/ride2", (req, res) => {
  res.json({ msg: "You have successfully riden ride 2" });
});

app.listen(3000);
