function getData(){
  return new Promise(function(resolve, reject){
    $.get('url 주소/products/1', function(response){
      if(response){
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data){
  console.log(data);
}).catch(function(err){
  console.error(err);
});


//Promise Chaining1
new Promise(function(resolve, reject){
  setTimeout(function(){
    resolve(1);
  },2000);
})
.then(function(result){
  console.log(result);
  return result + 10;
})
.then(function(result){
  console.log(result);
  return result + 20;
})
.then(function(result){
  console.log(result);
});



//Promise Chaining2
const p1 = new Promise(resolve => {
  setTimeout(() => resolve('resolve: p1'), 3000);
})
const p2 = (param) => new Promise(resolve => {
  setTimeout(() => resolve(`${param}, resolve: p2`), 5000);
});

p1.then(r1 => {
  console.log('after p1 resolve');
  return p2(r1);
}).then(r2 => {
  console.log('after p2 resolve');
  console.log(r2);
});
