var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = { 
    'article-one': {
        title: 'Article one | Padma',
        date: 'Aug 18, 2017',
        heading: 'Article One',
        content:`
        <p>
                        This is the content for my first article here. This is the content for my first article here. This is the content for my first article here. This is the content for my first article here. This is the content for my first article here. This is the content for my first article here.
                    </p>
                    <p>
                        This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. 
                    </p>
                    <p>
                        Lets see how it turns out to be.
                    </p>`
    },
    'article-two': {
        title: 'Article two | Padma',
        date: 'Aug 18, 2017',
        heading: 'Article Two',
        content: `
        <p>
                    This is the content for my second article here. This is the content for my second article here. This is the content for my second article here. This is the content for my second article here. This is the content for my second article here. This is the content for my second article here.
                </p>
                <p>
                    This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. 
                </p>
                <p>
                    Lets see how it turns out to be.
                </p>
                `
    },
    'article-three': {
        title:'Article three | Padma',
        date:'Aug 18, 2017',
        heading: 'Article Three',
        content: `
        <p>
                    This is the content for my third article here. This is the content for my third article here. This is the content for my third article here. This is the content for my third article here. This is the content for my third article here. This is the content for my third article here.
                </p>
                <p>
                    This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. This is also the first try as a webapp. 
                </p>
                <p>
                    Lets see how it turns out to be.
                </p>
                `
    }
};

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
                    ${date}
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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter + 1;
  res.send(counter.toString());    
});

app.get('/:articleName', function(req,res){
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
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

var names = [];
app.get('/submit-name/:name', function (req, res){
   var name = req.params.name;
   
   res.send(JSON.stringify(names));
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
