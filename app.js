// express is the server that forms part of the nodejs program
let express = require('express');
let path = require("path");
let app = express();
let os = require("os");
let requestIP = require('request-ip');
require('dotenv').config({ path: os.homedir()+'/code/envfiles/intertwines/laidlaw/.env' })


// add an https server to serve files 
var http = require('http');

var httpServer = http.createServer(app);
var httpServerPort = 4443;

const server = app.listen(httpServerPort, '0.0.0.0',() => {
  console.log(`Express is running on port ${server.address().port}`);
});



app.get('/',function (req,res) {
	res.send("Hello World from the App Server on Node port "+httpServerPort + " (mapped to Apache port 443)");
});

app.get('/getProjectsAPI',function (req,res) {
	res.send(process.env['PROJECTS_API']);
});

app.get('/getDataBrokerAPI',function (req,res) {
	res.send(process.env['DATA_BROKER_API']);
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

