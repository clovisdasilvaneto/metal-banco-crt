const http = require('http');
const port = process.env.PORT || 3100;

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
