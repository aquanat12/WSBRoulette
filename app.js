const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path')
const port = 80;
const app = express();
const bodyParser = require("body-parser"); 
const fetch = require('node-fetch');
const FAVICON = path.join(__dirname, 'assets', 'favicon.ico');



const server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');
    fs.createReadStream(FAVICON).pipe(res);
    return;}
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile('index.html', function (error, data) {
        if (error) {
            res.writeHead(404)
            res.write('Error: File Not Found')
        } else {
            res.write(data)
        }
    res.end()
    })
})


var qood = fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    var randomNumber = Math.floor(Math.random()*data.length);
    const qoodtext = data[randomNumber].text;
    const qoodauthor = data[randomNumber].author;
  });


server.listen(port, function (error) {
    if (error) {
        console.log('Something went wrong', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})

