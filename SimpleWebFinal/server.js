var http = require('http');
var url = require('url');

function start(route, handle){
  //이벤트 리스너로 등록됨
  //클라이언트가 HTTP 요청을 보내면 HTTP Server에
  //'request' 타입 이벤트가 발생하고 이 이벤트는 비동기로 처리된다.
  //처리가 완료되면 onRequest() 함수가 호출되는 것이다.
  //한마디로 onRequest()는 콜백 함수이기 때문에 클라이언트의
  //요청이 있을 떄만 작동한다.
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log('request for ' + pathname + ' received.');

    route(handle, pathname, response); //injected function call

    // reponse.writeHead(200, {'Content-Type' : 'text/plain'});
    // response.write('Hello World');
    // response.end();
  }

  http.createServer(onRequest).listen(8888);

  console.log('server has started');
}

exports.start = start;
