var express = require('express');
var app = express();
var debug = require('debug')('bloodlines');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname));
app.set('port', process.env.PORT || 3000);
app.get('/', function(req,res){
  res.render('index.html');
});

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});


