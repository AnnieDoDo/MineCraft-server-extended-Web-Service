const express = require('express');
const pa = require('path')
var session = require('express-session')
var redis = require("redis");
var RedisStore = require('connect-redis')(session);

var bodyParser  = require('body-parser');
var expressAccessToken = require('express-access-token');
var client = redis.createClient();
var sql = require('./sqlsearch');
var bcrypt = require('bcrypt');

const PORT = 3500;
const HOST = '127.0.0.1';
const app = express();

app.use(session({
  store: new RedisStore({ host: 'localhost', port: 3000, client: client}),
  secret: 'dodo',
  saveUninitialized: false,
  resave: false,
  cookie: {},
  
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
      res.sendFile(pa.resolve(__dirname,"indexfirst.html"));
});
app.get('/loginpage', (req, res) => {
    res.sendFile(pa.resolve(__dirname,"index.html"));
});

app.post('/login', (req, res) => {
    let bufferStr = "";
    req.on('data', data => {
      bufferStr += data.toString()
    })
    req.on('end', () => {
      let reqObj = JSON.parse(bufferStr);
      var data1=reqObj.account;
      var data2=reqObj.password;

      sql.search(data1)
      .then(data => {
        if(data.length != 0)
        {
            var checkpassword = data.password
            var checkresult = bcrypt.compareSync(data2, checkpassword); 
            console.log(checkresult)
            if(checkresult){
                req.session.acc = data1
            res.end('OK')
            }else{
                res.end('Invalid password')
            }  
        }else{
            res.end(`Unauthorized!`) 
        }
      })
    });
});

app.get('/loginOK', (req, res) => {
    if (req.session.acc) {
        res.sendFile(pa.resolve(__dirname,"index1.html"));
    }else{
       res.end('Failure')
    }    
});

app.get('/map', (req, res) => {
    if (req.session.acc) {
        res.sendFile(pa.resolve(__dirname,"showmap.html"));
    }else{
       res.end('Failure')
    }    
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.sendFile(pa.resolve(__dirname,"logout.html"));
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });