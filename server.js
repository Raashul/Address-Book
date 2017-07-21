var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser						= require('body-parser');
var nodemailer          			= require('nodemailer');
var passport 						= require('passport');



var multipart 							= require('connect-multiparty');
var multipartMiddleware			= multipart();



var app 									= express();



app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(multipartMiddleware);

app.use('/app', express.static(__dirname + "/app"))
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/server', express.static(__dirname + '/server'));

app.get('/', function(req, res){
	res.sendfile('./index.html');
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


