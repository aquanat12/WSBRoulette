const app = require("express")();
const fetch = require('node-fetch');
const bodyParser = require("body-parser"); 
const favicon = require('serve-favicon');
const Parser = require('rss-parser');
const parser = new Parser();
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(favicon(__dirname + '/assets/favicon.ico'));
var qoodapi = "https://type.fit/api/quotes";
var rssapi = "https://www.reddit.com/r/wallstreetbets/.rss?limit=100";


app.get("/", (req, res) => 
        {
        var qood = fetch(qoodapi)
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
        var symbol_pat = /(\b[A-Z]{3,5}\b)/g;
        let feed = await parser.parseURL(rssapi);
        feed.items.forEach(item => {
            var ticker = item.title.match(symbol_pat);
            if (ticker != null) {
                console.log (ticker);
                var cts = fetch("https://ticker-2e1ica8b9.now.sh/keyword/" + ticker[0])
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.length != 0) {
                            console.log(item.title + " : " + ticker[0]);
                            var stocks = [];
                            var stocksarray = stocks.concat(data);
                            //console.log(stocksarray.length);    
                            //console.log(stocks.length);
                            var randomNumber = Math.floor(Math.random()*data.length);
                            var  randticker = data[randomNumber].symbol;
                            var  randname = data[randomNumber].name;
                            //res.render("index", { qoodtext: qoodtext, qoodauthor: qoodauthor});
                        }
                    });
            };
            //console.log(item.title + ':' + item.link);
        });

    })();
app.listen(80);





