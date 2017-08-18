const http = require('http');
const port = process.env.PORT || 3100;
const heroku = require("heroku-ping");

heroku.ping({
	interval: 10000,     // milliseconds, defaults to 30 minutes
	silent: false,       // logging (default: false)
	apps: [{
		name: 'metal-form-banco-crt', // heroku app name - required
		path: "/calculator",     // default to root
		secure: false      // requires https (defaults: false)
	}]
});

http.createServer(function (req, res) {
	if(req.url != '/calculator') return res.writeHead(200);

	AllowCORS(res);

	res.end(JSON.stringify({
		status: 'The data was sent to the server with success.'
	}));
}).listen(port, ()=> console.log(`listening in the port: ${port}...`));

function AllowCORS(res){
	res.writeHead(200,{
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization, XMLHttpRequest, Content-Length, X-Requested-With, Origin, Accept, x-access-token, application/json',
		"Content-Type": "application/json"
	});
}
