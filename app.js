// express is the server that forms part of the nodejs program
var express = require('express');
var path = require("path");
var app = express();

let requestIP = require('request-ip');


// add an https server to serve files 
var http = require('http');

var httpServer = http.createServer(app);
var httpServerPort = 4490;

const server = app.listen('4490', '0.0.0.0',() => {
  console.log(`Express is running on port ${server.address().port}`);
});



app.get('/',function (req,res) {
	res.send("Hello World from the App Server on Node port "+httpServerPort + " (mapped to Apache port 443)");
});

// adding functionality to log the requests
app.use(function (req, res, next) {
	var filename = path.basename(req.url);
	var extension = path.extname(filename);
	console.log("The file " + filename + " "+extension + " was requested. The client's IP Address is: "+ requestIP.getClientIp(req));
	next();
});

app.use(express.static(__dirname));
app.use(express.static(__dirname +"/documentation"));

