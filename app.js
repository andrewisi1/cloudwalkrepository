// app.js
var Server = require('http').Server;
var Express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var path = require('path');
var sizeOf = require('image-size');
var cors = require('cors');
var morgan = require('morgan');
const nodemailer = require("nodemailer")
const mg = require("nodemailer-mailgun-transport")
const handlebars = require("handlebars")        

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")
 
const mailgunAuth = {
  auth: {
    api_key: "c753c0953046fef6e1101341988865cf-f135b0f1-53978998",
    domain: " https://api.mailgun.net/v3/sandbox83b1722954ba484e8ec95bc8f6022eb3.mailgun.org"
  }
}
 
const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
 
const template = handlebars.compile(emailTemplateSource)
 
const htmlToSend = template({message: "SERVICE IS DOWN!"})
 
const mailOptions = {
  from: "duarte.theus@hotmail.com",
  to: "mduarte.rabello@gmail.com",
  subject: "ALERT, SERVICE IS DOWN",
  html: htmlToSend
}
 

// Load .env configuration
const envFilePath = process.env.NODE_ENV === 'production' ? '.env' : '.env.development';
const envLoadResult = require('dotenv').config({ path: envFilePath });
if (envLoadResult.error) {
    throw envLoadResult.error;
}
// console.log(envLoadResult.parsed);
// Load StickyBoard config file
const stickyboardConfig = require('./stickyboard.config');
const configenv = require('./config.json')
// Initialize the app
const app = new Express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(morgan('dev'));
// Configure support for ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
// Initialize the server
const server = new Server(app);
const dataPath = './src/utils/stats.json';
// Define static assets folder
app.use('/static', Express.static(path.join(__dirname, 'src', 'static')));
app.use('/dist', Express.static(path.join(__dirname, 'dist')));
app.get('/api/json', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
const dataPath2 = './src/utils/console.json';    
app.get('/api/loggin', (req, res) => {
    fs.readFile(dataPath2, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        res.send(JSON.parse(data));
    });
});
// Set port and running environment
const port = process.env.PORT || 3000
const env = process.env.NODE_ENV || 'production'
delete process.env.BROWSER

// Set app bundle URL depends on running environment
var appBundleUrl
switch (env) {
case 'production':
    appBundleUrl = '/dist/app.bundle.js'
    break
case 'development':
    appBundleUrl = 'http://localhost:8080/app.bundle.js'
    break
}

app.get('*', function (req, res) {
    res.render('index', { ...stickyboardConfig, 'APP_BUNDLE_URL': appBundleUrl });
});


const TOKEN = '?auth=6eb718f846c6d303ed8054cdf7ccdb18c821de18';
const MSG = '&buf=Up'
const BASE_URL = 'https://tonto-http.cloudwalk.io/';
const API_BASE_URL = BASE_URL + TOKEN + MSG;


let interval = 5000;   
let success = 0;
let unsuccessful = 0;
let ishealth = 0;
let nohealth = 0;
let monstate =''
let re = /^CLOUDWALK Up$/

function Servmonitor() {
    const request = require('request');
    request(API_BASE_URL, {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    let logres = res
    logres = JSON.stringify(logres)
    fs.writeFile('./src/utils/console.json', logres, (err) => {
        if (err) throw err;
        console.log('Data written to file');
       });
    match = String(body)
    if (re.test(match)) {
        fs.readFile('./src/utils/stats.json', (err, data) => {
            if (err) throw err;
        let readhealth = JSON.parse(data);
        console.log(res)
        console.log(match)
        console.log("Valid");
        ishealth = ishealth + 1
        success =  success + 1
        //monstate = "UP"
        console.log(success)
        readhealth.qththres = success
        //readhealth.state ="UP"
        let updatesus = JSON.stringify(readhealth); 
        fs.writeFile('./src/utils/stats.json', updatesus, (err) => {
            if (err) throw err;
            console.log('Data written to file');
          });
        
        });
    }else {
        fs.readFile('./src/utils/stats.json', (err, data) => {
            if (err) throw err;
            let readunhealth = JSON.parse(data);
            console.log(readunhealth)
            console.log(res)
            console.log(match)
            console.log("Invalid");
            nohealth = nohealth + 1
            unsuccessful = unsuccessful + 1
            //monstate = "DOWN"
            console.log(unsuccessful)
            readunhealth.qtunthres = unsuccessful
            //readunhealth.state ="UP"
            let updatesus = JSON.stringify(readunhealth);
            fs.writeFile('./src/utils/stats.json', updatesus, (err) => {
                if (err) throw err;
                console.log('Data written to file');
          });
        });    
    } 
},

function Servhealth() {
    const request = require('request');
    request(API_BASE_URL, {
        json: true
    }, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
    match = String(body)
    fs.readFile('./config.json', (err, data) => {
    if (err) throw err;
    let envjson = JSON.parse(data)
    activehealth = envjson.healthhealththreshold
    activeunhealth = envjson.unhealththreshold
    for (i = 0; i >= activehealth; i++){
        ishealth = 0;
        nohealth = 0;
        request(API_BASE_URL, {
            json: true
        }, (err, res, body) => {
            if (err) {
                return console.log(err);
            }
            console.log('FOR IN HEALTH')
            console.log(res);           
        let match = healthresponse
        if (re.test(match)) {
            console.log("Valid");
            ishealth = ishealth + 1
            success = success + 1
            console.log(success)
        }else {
            console.log(data)
            console.log("Invalid");
            nohealth = nohealth + 1
            unsuccessful = unsuccessful + 1
            console.log(unsuccessful)    
            smtpTransport.sendMail(mailOptions, function(error, response) {
                if (error) {
                  console.log(error)
                } else {
                  console.log("Successfully sent email.")
                }
              })
            
mg.messages().send(data, function (error, body) {
	console.log(body);
});
        }
    });
    if (ishealth < activehealth){
        fs.readFile('./src/utils/stats.json', (err, data) => {
            if (err) throw err;
            let json = JSON.parse(data);
            json.state = "UP"
            let updatesus = JSON.stringify(json);
            fs.writeFile('./src/utils/stats.json', updatesus, (err) => {
                if (err) throw err;
                console.log('Data written to file');
 
            });
    });
    }
 }
});           
}); 


    });

}

setInterval(Servmonitor, 3000);
//setInterval(Servhealth,1000);
// Start the server
server.listen(port, err => {
    if (err) {
        console.error(err);
        setTimeout(startServer, 3000);
        return;
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
});