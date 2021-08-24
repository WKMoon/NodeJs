var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});
var Contact = mongoose.model('contact', contactSchema);

//Routes
//Home
app.get('/', function(req,res){
  Contact.find({},function(err,contacts){
    res.redirect('/contacts');
  });
});

//Contacts - Index
app.get('/contacts', function(req,res){
  Contact.find({}, function(err,contacts){
    if(err) return res.json(err);
    res.render('contacts/index', {contacts:contacts});
  });
});

//Contacts - New
app.get('/contacts/new', function(req,res){
  res.render('contacts/new');
});

//Contacts - create
app.post('/contacts', function(req,res){
  Contact.create('/contacts', function(req,res){
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});