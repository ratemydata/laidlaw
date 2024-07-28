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


// adding functionality to allow cross-domain queries when PhoneGap is running a server
app.use(function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
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

// functionality to show data for a specific project
app.get('/projects',function (req,res) {
	res.send(process.env['DATA_BROKER_API']);
});

// functionality to show generic interface with no data loaded
app.get('/index',function (req,res) {
    const options = {
        root: path.join(__dirname)
    };
    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', fileName);
        }
    });});



// adding functionality to log the requests
app.use(function (req, res, next) {
	var filename = path.basename(req.url);
	var extension = path.extname(filename);
	console.log("The file " + filename + " "+extension + " was requested. The client's IP Address is: "+ requestIP.getClientIp(req));
	next();
});

app.use(express.static(__dirname));
app.use(express.static(__dirname +"/documentation"));

