const express = require('express');
const pa = require('path')
var session = require('express-session')
//var cookieSession = require('cookie-session')
var redis = require("redis");
var RedisStore = require('connect-redis')(session);
//var cookieParser = require('cookie-parser')
var bodyParser  = require('body-parser');
var expressAccessToken = require('express-access-token');
var client = redis.createClient();
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("DB connected");
});

var islogin = false;
// App
const app = express();
//app.use(cookieParser())
app.use(session({
  store: new RedisStore({ host: 'localhost', port: 3000, client: client}),
  secret: 'dodo',
  saveUninitialized: false,
  resave: false,
  cookie: {}
}));
/*app.use(cookieSession({
  name: 'coockiesession',
  keys: ['key'],
  cookie: { secure: true,
            domain: '127.0.0.1:3000',
            path: '/',
          }
  })
);*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    if(req.session.views) {
      // if email key is sent redirect.
      res.redirect('/loginOK');
    }else {
      // else go to home page.
      //res.render('index.html');
      res.sendFile(pa.resolve(__dirname,"indexfirst.html"));
  }
 
});
app.get('/loginpage', (req, res) => {
  res.sendFile(pa.resolve(__dirname,"index.html"));
});

app.post('/login', (req, res) => {
  
  let bufferStr = "";
        req.on('data', data => {
          bufferStr += data.toString()
          req.on('end', () => {
            let reqObj = JSON.parse(bufferStr);
            con.query(`SELECT * FROM customers WHERE \`account\` = '${reqObj.account}' and \`password\` = '${reqObj.password}'`, function (err, result) {
              if (err){
                res.end(err.toString());
              }else{
                if(result.length == 0){
                  res.end(`Unauthorized!`);
                }else{
                  //res.redirect('/loginOK');
                  islogin=true;
                  //res.sendFile(pa.resolve(__dirname,"index1.html"));
                  
                  //res.redirect('/loginOK');
                }
              }
            });
          })
        })
});

app.get('/loginOK', (req, res) => {
  if(islogin)
  {
    res.sendFile(pa.resolve(__dirname,"index1.html"));
  }
  //res.sendFile(pa.resolve(__dirname,"index1.html"));
});

app.get('/logout', (req, res) => {
  res.sendFile(pa.resolve(__dirname,"logout.html"));
});



app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
