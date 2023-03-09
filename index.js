const express = require("express");
const path = require("path");
const app = express();

// Middlewares

const authorized = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
    next();
  } else {
    res.status(401).send("Not authorized");
  }
};

// Middlewares
app.use(authorized);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "contact.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "service.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT} `));
