var express = require('express');
var app = express();
var path = require('path');

app.set('port',(process.env.PORT || 7000));

app.use(express.static(__dirname)); // add js 
app.use(express.static(path.join(__dirname, 'public'))); // add css 

//routes will go here
app.get('/', function(req,res){
  res.sendFile(path.resolve('public/views/index.html'));
});

var server = app.listen(process.env.PORT || 7000, function(){
  console.log('Express App started');
});