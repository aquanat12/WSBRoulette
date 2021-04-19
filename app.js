const app = require("express")(); 
const fetch = require('node-fetch');
const bodyParser = require("body-parser"); 
const favicon = require('serve-favicon');
const Parser = require('rss-parser');
const parser = new Parser();
const StockSocket = require("stocksocket");
const StockSocket = require("stocksocket");
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(favicon(__dirname + '/assets/favicon.ico')); 


app.get("/", (req, res) => 
        {
        var qood = fetch("https://type.fit/api/quotes")
          .then(function(response) {
            return response.json();
          })
          .then(function(data) {
            var randomNumber = Math.floor(Math.random()*data.length);
            var  qoodtext = data[randomNumber].text;
            var  qoodauthor = data[randomNumber].author;
            res.render("index", { qoodtext: qoodtext, qoodauthor: qoodauthor});
          });
        }); 
app.listen(80);





