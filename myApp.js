let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config();

//bodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
//Logger middleware - changed string format made it work
app.use((req, res, next) => {
  const logString = req.method + " " + req.path + " - " + req.ip;
  console.log(logString);
  next();
})

/* console.log("Hello World"); */
//First endpoint
/* app.get("/", (req, res) => {
  res.send('Hello Express')
}); */

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

app.get("/now", (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time})
})

app.get("/:word/echo", (req, res) => {
  const echoWord = req.params.word;
  res.send({ "echo" : echoWord});
})

app.route("/name")
  .get((req, res) => {
    const {first: firstName, last: lastName } = req.query;
    res.send({
      "name" : `${firstName} ${lastName}`
    })
  })
  .post((req, res) => {
    const {first: firstName, last: lastName } = req.body;
    res.send({
      "name" : `${firstName} ${lastName}`
    });
  });

































 module.exports = app;
