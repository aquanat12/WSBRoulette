const app = require("express")(); 
const fetch = require('node-fetch');
const bodyParser = require("body-parser"); 
const favicon = require('serve-favicon');
app.set("view engine", "ejs"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(favicon(__dirname + '/assets/favicon.ico')); 



async function qoodresult(){
const r = await qood;
var qoodtext = r.text;}
console.log(qoodresult());
app.get("/", (req, res) => 
        {
            var qoodtext = "hi";
            res.render("index", { qoodtext: qoodtext });
        }); 
app.listen(80);


var qood = fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var randomNumber = Math.floor(Math.random()*data.length);
    return data[randomNumber];
  });


