const app = require("express")();
const fetch = require('node-fetch');
const bodyParser = require("body-parser"); 
const favicon = require('serve-favicon');
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(favicon(__dirname + '/assets/favicon.ico'));
var qoodapi = "https://type.fit/api/quotes";
var rssapi = "https://www.reddit.com/r/wallstreetbets/.rss?limit=100";
var stocks = [];

// edited from https://gist.github.com/ralphcrisostomo/3141412
function compressArray(original) {
 
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 1) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};

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
                var i;
                for(i = 0; i < ticker.length; i++){
                    if (ticker[i] != "YOLO" && ticker[i] != "WSB" && ticker[i] != "DFV"){
                        stocks.push(ticker[i]);
                    }
                }
                                //var randomNumber = Math.floor(Math.random()*data.length);
                               // var  randticker = data[randomNumber].symbol;
                               // var  randname = data[randomNumber].name;
                               //res.render("index", { qoodtext: qoodtext, qoodauthor: qoodauthor});
            };
            //console.log(item.title + ':' + item.link);
        });
        var stocksarray = compressArray(stocks);
        console.log(stocksarray);
    })();
app.listen(80);





