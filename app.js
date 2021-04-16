const app = require("express")();
const fetch = require('node-fetch');
const bodyParser = require("body-parser"); 
const favicon = require('serve-favicon');
const Parser = require('rss-parser');
var parser = new Parser();
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
    (async () => {

        let feed = await parser.parseURL('https://www.reddit.com/r/wallstreetbets/.rss');

        feed.items.forEach(item => {
            console.log(item.title + ':' + item.link)
        });

    })();
app.listen(80);





