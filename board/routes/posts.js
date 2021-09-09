var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

//index
router.get('/', function(req,res){
  Post.find({})
});
