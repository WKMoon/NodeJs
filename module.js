console.log("hello world...");
var os = require('os');
console.log(os.type());
console.log(os.hostname());
console.log(os.platform());
console.log(os.cpus);
console.log(os.arch());

var url = require('url');
var parsedUrl = url.parse('https://www.google.co.kr/search?q=nodejs&oq=nodejs&aps=chrome.0.69i59l3j69i60l3.968j0j8&sourceid=chrome&ie=UTF-8');
console.log(parsedUrl);

var qs = require('querystring');
var objQuery = qs.parse(parsedUrl.query);
var strQuery = qs.stringify(objQuery);

console.log(objQuery);
console.log(strQuery);

var util = require('util');
var date = util.format('%d%s %d%s', 5, '월', 5, '일 어린이날');

console.log(date);

var crypto = require("crypto");

//해시 생성
var shasum = crypto.createHash('sha1');
shasum.update('crypto_hash');
var output = shasum.digest('hex');

console.log(output);

var key = '비밀'; //비밀키값
var input = 'password486';

//암호화
var cipher = crypto.createCipher('aes192', key);
cipher.update(input, 'utf8', 'base64');
var cipheredOutput = cipher.final('base64');

//암호화 해제
var decipher = crypto.createDecipher('aes192', key);
decipher.update(cipheredOutput, 'base64', 'utf8');
var decipheredOutput = decipher.final('utf8');

console.log(input);
console.log(cipheredOutput);
console.log(decipheredOutput);

var fs = require('fs');

//비동기 파일 쓰기
fs.writeFile('test.txt','testing~','utf8',function(error){
  if(error){
    console.log(error);
  }else{
    console.log('파일 작성 완료');
  }
});

//비동기 파일 읽기
fs.readFile('test.txt','utf8',function(error,data){
  if(error){
    console.log(error);
  }else{
    console.log(data);
  }
});

//동기 파일 쓰기
try{
  fs.writeFile('test.txt','testing~','utf8');
}catch(e){
  console.log(e);
}
