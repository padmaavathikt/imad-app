var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');
var session = require('express-session');

var config = {
    user: 'padmavathythiruvenkadam',
    database: 'padmavathythiruvenkadam',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(session({
    secret:'somerandomvalue',
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 30}
}));

function createTemplate (data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    
    var htmlTemplate = `
    <html>
        <head>
            <title>${title}</title>
            <link href="/ui/style.css" rel="stylesheet">
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>${heading}</h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

var pool = new Pool(config);

function hash (input, salt){
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'SHA512');
    return ['pbkdf2', '10000', salt, hashed.toString('hex')].join('$');
}

app.get('/hash/:input', function (req, res){
    var hashedString = hash(req.params.input, 'this-is-a-random-string');
    res.send(hashedString);
});

app.post('/create-user', function (req, res){
   var username = req.body.username;
   var password = req.body.password;
   
   console.log("post received: %s %s", username, password);
   
   var salt = crypto.randomBytes(512).toString('hex');
   var dbString = hash (password, salt);
   
   pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)', [username, dbString], function (err, result){
      if (err){
        res.status(500).send(err.toString());
      } else {
          res.setHeader('Content-Type', 'application/json')
          res.send(JSON.parse('{"message":"User successfully created"}'));
      }
   });
});

app.post('/login', function (req, res){
   
   var username = req.body.username;
   var password = req.body.password;
   
   pool.query('SELECT * FROM "user" WHERE username=$1', [username], function (err, result){
      if(err){
          res.status(500).send(err.toString());
      } else{
          if (result.rows.length === 0){
              res.status(403).send('username/password is invalid');
          } else {
              var dbPass = result.rows[0].password;
              var salt = dbPass.split('$')[2];
              var hashedPwd = hash(password, salt);
              
              if(hashedPwd === dbPass){
                  req.session.auth = {userId: result.rows[0].id};
                  res.setHeader('Content-Type', 'application/json');
                  res.send(JSON.parse('{"message":"User exists"}'));
              } else {
                  res.status(403).send('username/password is invalid');
              }
          }
      }
   });
});

app.get('/check-login', function(req, res){
   if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are logged in as : ' + req.session.auth.userId.toString());
   } else{
       res.send('You are not logged in');
   }
});

app.get('/logout', function(req, res){
   delete req.session.auth;
   res.setHeader('Content-Type', 'application/json');
   res.send(JSON.parse('{"message":"User logged out"}'));
});

app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM TEST', function (err, result){
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
    
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());    
});

var names = [];
app.get('/submit-name', function (req, res){
   var name = req.query.name;
   names.push(name);
   res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req,res){
    //var articleName = req.params.articleName;
    
    pool.query("SELECT * FROM article WHERE title = $1",  [req.params.articleName], function (err, result){
        if(err){
            res.status(500).send(err.toString());
        } else{
            if (result.rows.length === 0){
                res.status(404).send("No Article found");
            }
            else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'main.js')); 
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
