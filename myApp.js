let express = require('express');
let app = express();

console.log("Hello World");
//First endpoint
/* app.get("/", (req, res) => {
  res.send('Hello Express')
}); */

app.get("/", (req, res) => {
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
});



































 module.exports = app;
