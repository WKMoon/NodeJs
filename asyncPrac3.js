//코드의 재사용
//일반 함수가 변구에 할당되면 필요할 때마다 다른 함수의 인자로 넘어갈 수 있다.
//'countFile()'함수는 함수를 인자로 전달받아 이를 CallBack함수로 전환시킨다.
//즉, 일반 함수를 CallBack 함수로 Wrapping하면 CallBack 함수가 되는 것이다.
//이러한 형태로 함수 코드를 재사용 할 수 있다.
var fs = require('fs');

var path1 = './';
var path2 = '.././';
var countCallback;

function countFiles(path, callback){
  fs.readdir(path, function(err, filenames){
    callback(err, path, filenames.length);
  });
}

countCallBack = function(err,path,count){
  console.log(count + ' files in ' + path);
}

countFiles(path1, countCallBack);
countFiles(path2, countCallBack);

//CallBack의 호출 시점
var fs = require('fs');

//중첩 CallBack이므로 외부 CallBack이 모두 수행된 후 내부 CallBack이 수행된다.
function executeCallbacks1(){
  fs.readdir('.', function(err, filenames){
    var i;
    for(i = 0; i < filenames.length; i++){
      fs.stat('./' + filenames[i], function(err,stats){ //파일에 대한 정보
        console.log(i + ':'+stats.isFile());//boolean if obj is file
      });
    }
  });
}

executeCallbacks1();

//Closure를 생성하여 새로운 Scope를 만든다.
//다시 말해 즉시 실행 함수를 만들었다.
function executeCallbacks2(){
  fs.readdir('.', function(err,filenames){
    var i;
    for(i = 0; i < filenames.length; i++){
      (function(){
        var j = i;
        fs.stat('./' + filenames[i], function (err,stats){
          console.log(j + ':' + stats.isFile());
        });
      })();
    }
  });
}

executeCallbacks2();
