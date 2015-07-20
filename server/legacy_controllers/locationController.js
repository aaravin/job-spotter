var Promise = require('bluebird');
var Loc = require('../../legacy_sqldb/models/loc');
var Job = require('../../legacy_sqldb/models/job');
var Startup = require('../../legacy_sqldb/models/startup');
var db = require('../../legacy_sqldb/config.js');

module.exports = {
  getJobsWithLocation: function (req, res, next) {
    console.log("Sending jobs to /api/jobs/city", req.query.cityName);
    var allJobs = [];
    var locClient;

    db.knex.select('Jobs.id as id', 'Jobs.name as title', 'Startups.name as company', 'Jobs.salary_min as salmin', 'Jobs.salary_max as salmax', 'Locs.name as city').from('Locs')
    .leftJoin('loc_job', 'Locs.id', 'loc_job.Loc_rowId')
    .leftJoin('Jobs', 'Jobs.id', 'loc_job.Job_rowId')
    .leftJoin('startup_job', 'Jobs.id', 'startup_job.Job_rowId')
    .leftJoin('Startups', 'Startups.id', 'startup_job.Startup_rowId')
    .where('Locs.name', req.query.cityName)
    .then(function (jobs) {
      //if Washington, DC, don't use normal regex because it removes substring after ','
      if (jobs[0].city === "washington,_dc") {
        locClient = "Washington, DC";
      } else {
        locClient = jobs[0].city.replace(/_/g, " ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
      }
      for (var i = 0; i < jobs.length; i++) {
        var job = {
          job_id: jobs[i].id,
          title: jobs[i].title,
          salary: (jobs[i].salmin + jobs[i].salmax)/2,
          locServer: jobs[i].city,
          locClient: locClient,
          company: jobs[i].company
        };

        allJobs.push(job);
      }

      res.status(200).send(allJobs);
    });
  }
};

