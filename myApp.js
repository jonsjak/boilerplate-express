let express = require('express');
let app = express();
require('dotenv').config();

console.log("Hello World");
//First endpoint
/* app.get("/", (req, res) => {
  res.send('Hello Express')
}); */

//Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip})`);
  next();
})

app.get("/", (req, res) => {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  const messageStyle = process.env.MESSAGE_STYLE;
  const responseMessage = {"message" : "Hello json"};

  if (messageStyle === 'uppercase') {
    responseMessage.message = responseMessage.message.toUpperCase();
  }
  
  res.json(responseMessage);

});



































 module.exports = app;
