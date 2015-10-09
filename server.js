var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname)); //send angular files
app.use(express.static(__dirname + '/public')); // send static files css
app.get('/',function(req,res){
  res.sendfile('public/views/index.html'); //send html
});

app.set('port', (process.env.PORT || 7000));


var server = app.listen(app.get('port'));