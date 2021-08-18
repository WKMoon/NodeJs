var express = require('express');
var app = express();

//HTTP method나 route에 상관없이 서버에 요청이 올 때마다 무조건 콜백 함수가 실행된다.
//express.static(__dirname + 'public') 이 함수를 호출하면 실제 사용될 콜백 함수가 return 된다.
//__dirname은 node.js에서 프로그램이 실행중인 파일의 위치를 나타내는 global variable이다.
app.use(express.static(__dirname + '/public')); //1

//app.use(express.static(__dirname + 'public')); 는 현재 위치/public route를
//static 폴더로 지정하라는 명령어

var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
