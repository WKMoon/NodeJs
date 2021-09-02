var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

//DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017");
var db = mongoose.connection;

db.once('open', function(){
  console.log('DB Connected');
});

db.on('error', function(err){
  console.log('DB ERROR: ', err);
});

app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));

//app.use(express.json()) express에도 bodyParser가 빌트인 되어있기 때문에 굳이 bodyParser를 따로 import할 필요없다.(Express v4.16.0 기준)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

//Routes
app.use('/', require('./routes/home'));
app.use('/contacts', require('./routes/contacts'));


var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});
