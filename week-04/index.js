const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

var users = [
  {
    name: "Aayush",
    kidneys: [
      {
        health: false,
      },
      {
        health: true,
      },
    ],
  },
];

app.get("/", (req, res) => {
  const aayushKidney = users[0].kidneys;
  const number = aayushKidney.length;
  let numberOfHealthyKidneys = 0;

  for (let i = 0; i < aayushKidney.length; i++) {
    if (aayushKidney[i].health) {
      numberOfHealthyKidneys++;
    }
  }

  const numberOfUnhealthyKidneys = number - numberOfHealthyKidneys;

  res.json({
    number,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

app.post("/", (req, res) => {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    health: isHealthy,
  });

  res.json({
    msg: "Done!",
  });
});

app.put("/", (req, res) => {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].health = true;
  }
  res.json({
    msg: "Done!",
  });
});

app.delete("/", (req, res) => {
  if (isThereAtLeastOneUnhealthyKidney()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].health) {
        newKidneys.push({
          health: true,
        });
      }
    }

    users[0].kidneys = newKidneys;
    res.json({
      msg: "Done!",
    });
  } else {
    res.status(411).json({ msg: "You've no bad kidneys" }); // Single response
  }
});

function isThereAtLeastOneUnhealthyKidney() {
  let atLeastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].health) {
      atLeastOneUnhealthyKidney = true;
    }
  }
  return atLeastOneUnhealthyKidney;
}

app.listen(port);
