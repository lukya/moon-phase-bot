// server.js
// where your node app starts

const downloadLogFileName = './public/download-log.json'
const moonPhaseImageFileName = './public/MoonPhase.png'
const moonPhaseImageUrlForDay = 'https://api.usno.navy.mil/imagery/moon.png?date=%s&time=0:01';

// init project
const https = require('https');
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/ping', (request, response) => {
  console.log(Date.now() + ' Ping Received');
  response.sendStatus(200);
});

// http://expressjs.com/en/starter/basic-routing.html
app.get('/update-latest', function (request, response) {
  console.log('Request ' + request);
  
  let dateString = getFormattedDateString()
  response.send('Today: ' + dateString);
  
  downloadMoonPhaseImageForTheDay(dateString)
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

setInterval(() => {
  https.get(`https://${process.env.PROJECT_DOMAIN}.glitch.me/ping`);
}, 280000);

function getFormattedDateString() {
  const dateToday = new Date();
  const year = dateToday.getFullYear()
  const month = dateToday.getMonth()
  const date = dateToday.getDate()
  return date + '/' + (month + 1) + '/' + year 
}

function getTimestampString() {
  return Date().toISOString().substr(0, 19).replace('T', ' ');
}

function checkAndDownloadImage() {
  
}

function checkLastDownloadDate() {
  
}

// Downloads moon phase image for the day at 00:01
// 
function downloadMoonPhaseImageForTheDay(formattedDateString) {
  var util = require('util');

  const imageUrlStirng = util.format(moonPhaseImageUrlForDay, formattedDateString)
  
  console.log('Downloading image: ' + imageUrlStirng);
  
  const fs = require('fs');  
  const request = https.get(imageUrlStirng, function(response) {
    const imageFile = fs.createWriteStream(moonPhaseImageFileName);
    console.log('Saving image: ' + imageFile.path);
    response.pipe(imageFile);
  });
}


