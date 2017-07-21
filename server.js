var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser						= require('body-parser');
var nodemailer          			= require('nodemailer');
var passport 						= require('passport');



var multipart 							= require('connect-multiparty');
var multipartMiddleware			= multipart();



var app 									= express();

mongoose.connect('mongodb://localhost/address_book');


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


app.get('/api/home/getHomePage', function(req, res){

var Post      =   require('./server/datasets/users');

  Post.find({}, function(err, users){
    console.log('this is the data from the database');
    console.log(users);
    if(err){
      res.send('error in connecting database');
    }
    else{
      res.json(users);
    }
  })

})

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


