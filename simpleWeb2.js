//http 객체 로드
var http = require('http');

//익명 함수
//server 인스턴스 생성
http.createServer(function(request, response){
  response.writeHead(200,{'Content-Type' : 'text/plain'});
  response.write('Hello NodeJS');
  response.end();
}).listen(8888);
//listen - http 서버를 시작하게 한다.


//기명 함수
function onRequest(request, response){
  console.log('request received');
  response.writeHead(200,{'Content-Type' : 'text/plain'});
  response.write('Hello NodeJS');
  response.end();
}

http.createServer(onRequest()).listen(8888);
//'server has started' 메시지가 먼저 출력된다. 'request received'
//메시지는 CallBack 함수 내에 있으므로 클라이언트 요청이 있을 때만 출력
console.log('server has started');


//addListener
//요청 이벤트인 'request'와 클라이언트 접속 이벤트인 'connection'을 따로 처리할 수 있다.
//이러한 방법으로 이벤트 리스너를 등록하려면 server가 어떤 종류의 이벤트 타입이 있는지 미리 알아야 한다.
var server = http.createServer();

server.addListener('request', function(request,response){
  console.log('requsted...');
  response.writeHead(200,{'Content-Type' : 'text/plain'});
  response.write('Hello NodeJS');
  response.end();
});

server.addListener('connection', function(socket){
  console.log('connected...');
});

server.listen(8888);
