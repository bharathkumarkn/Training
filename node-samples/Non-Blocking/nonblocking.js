var http = require('http');
var url =  require('url');
var cp = require('child_process');

function onRequest(request, response){

	var pathname = url.parse(request.url).pathname;
	if(pathname=='/wait'){
		cp.exec('node block.js', mycallback);

	}else{

		response.writeHead(200, {'Content-Type':'text/plain'});
		response.write('Hello World\n');
		response.end();	
	}

	console.log('new Connection');

	function mycallback(){

		response.writeHead(200,{'Content-Type':'text/plain'});
		response.write('Thanks for waiting!\n');
		response.end();
	}

}
http.createServer(onRequest).listen(8000);
console.log('Sever Started');