require('dotenv').config(); // ✅ MUST be at the top

let express = require("express");
let app = express();

console.log("Hello World");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

app.use("/public", express.static(__dirname + "/public"));

console.log("MESSAGE_STYLE =", process.env.MESSAGE_STYLE);
module.exports = app;
