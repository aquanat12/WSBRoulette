var app = require("express")(); 
var bodyParser = require("body-parser"); 
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.get("/", (req, res) => { res.render("index") }); 
app.listen(80);



var qood = fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var randomNumber = Math.floor(Math.random()*data.length);
    return data[randomNumber];
  });


