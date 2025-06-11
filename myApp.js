require('dotenv').config();
let bodyParser = require("body-parser");
let express = require("express");
let app = express();

console.log("Hello World");

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Serve static assets
app.use("/public", express.static(__dirname + "/public")); // not working i dont know the css is not aligining 

// Routes
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

function middleware(req, res, next) {
  req.time = new Date().toString();
  next();
}
app.get('/now', middleware, (req, res) => {
  res.send({ time: req.time });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});

app.get('/name', (req, res) => {
  var { first: firstname, last: lastname } = req.query;
  res.json({ name: `${firstname} ${lastname}` });
});

app.post("/name", (req, res) => {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

console.log("MESSAGE_STYLE =", process.env.MESSAGE_STYLE); // for debugging 
module.exports = app;
