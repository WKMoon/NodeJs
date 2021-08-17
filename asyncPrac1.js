//동기 방식
var fs = require('fs');

var filenames = fs.readdirSync('.');
var i;
for(i = 0; i < filenames.length; i++){
  console.log(filenames[i]);
}
console.log('ready');
console.log('can process next job');

//비동기 방식 ready 메시지 보다 밖의 console메시지가 먼저 출력된다.
//File System의 비동기 API를 사용했기 때문이다.
fs.readdir('.', function(err, filenames){
  var i;
  for(i = 0; i < filenames.length; i++){
    console.log(filenames[i]);
  }
  console.log('ready');
});
console.log('can process next job');
