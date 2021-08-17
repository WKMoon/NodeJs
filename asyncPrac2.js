//동기 방식의 순차 처리(모든 API는 동기 API를 사용한다.)
var fs = require('fs');
var oldFileName = './processId.txt';
var newFileName = './processIdOld.txt';
fs.chmodSync(oldFileName, 777);
console.log('complete chmod');
fs.renameSync(oldFileName,newFileName);
console.log('complete rename');

var isSysmLink = fs.lstatSync(newFileName).isSymbolicLink();
console.log('complete symbolic check');

//비동기 방식의 순차 처리(중첩된 Callback을 이용하여 순서가 보장되게끔 한다.
//한다. Callback은 항상 처리 완료 후에 호출되므로 Callback을 중첩시키면
//순서가 뒤바뀔 일이 없다.)
//하지만 중첩 Callback을 사용하면 그 코드의 Depth가 너무 깊어진다는 단점이 있다.
//너무 과도하게 사용하면 가독성이 떨어지기 떄문에 'async'라는 모듈이 있다.
var fs = require('fs');
var oldFileName = './processId.txt';
var newFileName = './processIdOld.txt';

fs.chmod(oldFileName, 777, function(err){
  console.log('complete chmod');
  fs.rename(oldFileName, newFileName, function(err){
    console.log('complete rename');
    fs.lstat(newFileName, function(err,stats){
      var isSymLink = stats.isSymbolicLink();
      console.log('complete symbolic check');
    });
  });
});

//ayncs 모듈. NPM으로 모듈을 설치 해야한다.
//'npm install async' 으로 설치
//async의 waterfallAPI를 사용하면 Callback의 중첩을 줄이면서 로직의 순서를 보장한다.
var fs = require('fs');
var async = require('async');
var oldFileName = './processId.txt';
var newFileName = './processIdOld.txt';

async.waterfall(
  function(cb){
    fs.chmod(oldFileName, 777, function(err){
      console.log('complete chmod');
      cb(null);
    });
  },
  function(cb){
    fs.rename(oldFileName, newFileName, function(err){
      console.log('complete rename');
      cb(null);
    });
  },
  function(cb){
    fs.lstat(newFileName, function(err,stats){
      var isSymLink = stats.isSymbolicLink();
      console.log('complete symbolic check');
    });
  }
);

//Nodejs의 병렬 처리
//동기 방식
var fs = require('fs');

function calculateBytes(){
  var totalBytes = 0,
  i,
  filenames,
  stats;
  filenames = fs.readdirSync('.');
  for(i = 0; i < filenames.length; i++){
    stats = fs.statSync('./' + filenames[i]);
  }
  console.log(totalBytes);
}

calculateBytes();


//비동기 방식 병렬 처리
//파일 목록에서 각 파일마다 비동기 이벤트를 전달하는 방식이다.
//단위 작업이 많아지므로 전체 서버에서의 부담이 적어진다.
//fs.stat() api에 전달되는 Callback 함수는 파일 사이즈의
//총 합을 저장하기 위하여 외부 함수의 변수에 접근한다.
//이는 Callback 함수가 Closure이기 때문에 가능하다.
//참고로 Closure는 자신의 Scoper뿐만 아니라 외부 함수의 Scope도 가진다.
//Callback이 전달된 횟수만큼  count에 저장하고 각 작업이 완료될
//때마다 count를 하나씩 감소시킨다.
//따라서 일반적으로 병렬 처리시에는
//count를 이용한 패턴을 자주 사용한다.
var fs = require('fs');

function calculateBytes(){
  fs.readdir('.',function(err,filenames){
    var count = filenames.length;
    var totalBytes = 0;
    var i;
    for(i = 0; i < filenames.length; i++){
      fs.stat('./' + filenames[i], function(err,stats){
        totalBytes += stats.size;
        count--;
        if(count === 0){
          console.log(totalBytes);
        }
      });
    }
  })
}

calculateBytes();
