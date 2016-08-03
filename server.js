var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var db = massive.connectSync({db : "massive_demo"}); // must be above endpoints

db.get_all_injuries(function(err, injuries) {
  //console.log(injuries) // injuries will contain an array of injuries
});

db.get_all_causes(function(err, causes) { // callback is for async
  //console.log(causes) // causes will contain an array of causes
});

db.get_all_incidents(function(err, incidents) { // callback is for async
  //console.log(incidents)
  return incidents;
});


var app = express();
app.use(bodyParser.json());

var port = 3000;

app.get('/incidents', function(req, res) {
  db.get_all_incidents(function(err, incidents){
    res.json(incidents);
    console.log('GET Incidents sighting');
  });
});

app.post('/incidents', function(req, res) {
  var incident = [req.body.us_state, req.body.injury_id, req.body.cause_id];
  db.create_incident(incident, function(err, db_response){
    res.json(db_response);
    console.log('New Incident Created');
  })

});

app.listen(port, function() {
  console.log("Started server on port", port);
});
