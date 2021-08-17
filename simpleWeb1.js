var http = require('http');

//익명 함수
http.createServer(function(request, response) {
  response.writeHead(200, {'Content-type' : 'text/plain'});
  response.write('Hello nodejs');
  response.end();
}).listen(8888);

//기명 함수
function onRequest(request, response){
  response.writeHead(200, {'Content-type' : 'text/plain'});
  response.write('Hello nodejs');
  response.end();
}
http.createServer(onRequest).listen(8888);

//addListener() 리스너 등록 방법
var http = require('http');
var server = http.createServer();

server.addListener('request', function(request,response){
  console.log('requested...');
  response.writeHead(200,{'Content-type':'text/plain'});
  response.write('Hello nodejs');
  response.end();
});

server.addListener('connection',function(socket){
  console.log('connected...');
});

server.listen(8888);
