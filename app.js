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
        var symbol_pat = /(^\$[A-Z]{3,5})|([A-Z]{3,5})/;
        let feed = await parser.parseURL('https://www.reddit.com/r/wallstreetbets/.rss?limit=100');
        feed.items.forEach(item => {
            var ticker = item.title.match(symbol_pat);
            if (ticker != null) {
                var cts = fetch("https://ticker-2e1ica8b9.now.sh/keyword/" + ticker[0])
                    .then(function (response) {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.length != 0) {
                            console.log(data[0].symbol);
                            console.log(data[0].name);
                        }
                    });
            };
            //console.log(item.title + ':' + item.link);
        });

    })();
app.listen(80);





