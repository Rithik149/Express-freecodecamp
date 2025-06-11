require('dotenv').config(); // ✅ MUST be at the top

let express = require("express");
let app = express();

console.log("Hello World");


app.use((req,res,next)=>{
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next()
});

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

// app.get('/now',(req,res,next)=>{
//   req.time=new Date().toString()
//   next();
// },(req,res)=>{
//   res.send({time:req.time})
// });
//more readable version 👇
function middleware(req, res, next) {
  req.time = new Date().toString();
  next();
}
app.get('/now',middleware,(req,res)=>{
  res.send({time:req.time})
})

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json( {echo: word} );
});

app.get('/name',(req,res)=>{
  // var firstname = req.query.first // more simple declaring
  // var lastname = req.query.last

  var { first:firstname , last:lastname }=req.query; //Extract the first property from req.query and assign it to a new variable called firstname.
  res.json({name:`${firstname} ${lastname}`})
})




app.use("/public", express.static(__dirname + "/public"));

console.log("MESSAGE_STYLE =", process.env.MESSAGE_STYLE);
module.exports = app;
