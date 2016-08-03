var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var db = massive.connectSync({
    db: "massive_demo"
}); // must be above endpoints

db.get_all_injuries(function(err, injuries) {
    //console.log(injuries) // injuries will contain an array of injuries
});

db.get_all_causes(function(err, causes) { // callback is for async
    //console.log(causes) // causes will contain an array of causes
});

db.get_all_incidents(function(err, incidents) { // callback is for async
    // console.log(incidents)
    return incidents;
});

db.get_all_incidents_by_cause(function(err, incidents) {

    // console.log(incidents);
    return incidents;
});

var app = express();
app.use(bodyParser.json());

var port = 3000;


// GET
app.get('/incidents', function(req, res) {
    if (req.query.cause) {
      req.query.cause = req.query.cause[0].toUpperCase() + req.query.cause.slice(1).toLowerCase();
        db.get_all_incidents_by_cause([req.query.cause], function(err, incidents) {
            //printErr(err);
            console.log('GET Incidents by Cause sighting')
            res.json(incidents);
        });
    } else if (req.query.affected_area) {
      req.query.affected_area = req.query.affected_area[0].toUpperCase() + req.query.affected_area.slice(1).toLowerCase();
      console.log(req.query.affected_area);
      db.get_all_incidents_by_affected_area([req.query.affected_area], function(err, incidents) {
          //printErr(err);
          console.log('GET Incidents by Affected Area sighting')
          res.json(incidents);
      });
    } else {
        db.get_all_incidents(function(err, incidents) {
            //printErr(err);
            console.log('GET Incidents sighting')
            res.json(incidents);
        });
    }
});

// POST
app.post('/incidents', function(req, res) {
    var incident = [req.body.us_state, req.body.injury_id, req.body.cause_id];
    db.create_incident(incident, function(err, db_response) {
        res.json(db_response);
        console.log('New Incident Created');
    })

});

app.listen(port, function() {
    console.log("Started server on port", port);
});
