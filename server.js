var express 						= require('express');
var mongoose 						= require('mongoose');
var bodyParser						= require('body-parser');
var nodemailer          			= require('nodemailer');
var passport 						= require('passport');



var multipart 							= require('connect-multiparty');
var multipartMiddleware			= multipart();


var app 									= express();

//mongoose.connect('mongodb://localhost/address_book');


//this mongoose connection is for heroku

mongoose.createConnection("mongodb://Rashul:Password12@ds151163.mlab.com:51163/address_book_db");

mongoose.connect(process.env.MONGODB_URI, function(err){
 if(err){
   console.error(err);
 }else{
   console.log('success');
 }
})



var Post      =   require('./server/datasets/users');

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

  Post.find({}, function(err, users){
    if(err){
      res.send('error in connecting database');
    }
    else{
      res.json(users);
    }
  })
});

app.post('/api/user/add', function(req, res){
  var request = req.body;
  var post = new Post(request);
  post.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.json(request);
    }
  });
});

app.post('/api/contact/edit', function(req, res){
  var request = req.body;
  Post.findById(request.id, function(err, post){
    if(err){
      res.send(err);
    }
    else{
      res.json(post);
    }
  })
})


app.post('/api/user/edit', function(req, res){
  var request = req.body;
  console.log(request);

  Post.findByIdAndUpdate(request.id, {
    $set:{
      name: request.name,
      email: request.email,
      phone: request.phone,
      phone: request.phone,
      note: request.notes,
    }
  }, {new: true}, function(err, updatedUser){
    if(err){
      console.log(err);
      res.send(err);
    }
    else{
      res.json(updatedUser)
    }

  })

});



  app.post('/api/user/delete', function(req, res){
    var id = req.body.id;
    console.log(id);

      //delete him
      // Post.remove(id, function(err, user){
      //   if(err){
      //     console.log(err);
      //   }
      //   else{
      //     Post.find({}, function(err, users){
      //       if(err){
      //         res.send('error in connecting database');
      //       }
      //       else{
      //         console.log(users);
      //         res.json(users);
      //       }
      //     })
      //   }
      // })
   

    Post.findOneAndRemove({ _id: id }, function(err, result) {
      if (err) {
        console.log(err);
      }
      else{
         Post.find({}, function(err, users){
          if(err){
            res.send('error in connecting database');
          }
          else{
            res.json(users);
          }
        })
      }
    });

  })

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", 
    this.address().port, app.settings.env);
});


