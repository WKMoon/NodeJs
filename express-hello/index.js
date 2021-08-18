var express = require('express'); //설치한 express 모듈을 불러와서 변수에 담는다.
var app = express(); //express를 실행하여 app object를 초기화 한다.

app.get('/', function(req,res){ // '/'위치에 get 요청을 보내는 경우
  res.send('Hello World'); //서버에 get 요청이 있는 경우에 실행
});

var port = 3000; //사용할 port 번호를 변수에 넣는다.
app.listen(port, function(){ //서버가 실행되는 경우에 실행
  console.log('server on! http://localhost:'+port);
});
