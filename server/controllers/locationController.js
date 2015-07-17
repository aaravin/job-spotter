var Promise = require('bluebird');
var Loc = require('../../sqldb/models/loc');
var Job = require('../../sqldb/models/job');
var Startup = require('../../sqldb/models/startup');
var db = require('../../sqldb/config.js');

module.exports = {
  getJobsWithLocation: function (req, res, next) {
    console.log("Sending jobs to /api/jobs/city", req.query.cityName);
    var allJobs = [];

    db.knex.select('Jobs.id as id', 'Jobs.name as title', 'Startups.name as company', 'Jobs.salary_min as salmin', 'Jobs.salary_max as salmax', 'Locs.name as city', 'Roles.name as role').from('Locs')
    .innerJoin('loc_job', 'Locs.id', 'loc_job.Loc_rowId')
    .innerJoin('Jobs', 'Jobs.id', 'loc_job.Job_rowId')
    .innerJoin('startup_job', 'Jobs.id', 'startup_job.Job_rowId')
    .innerJoin('Startups', 'Startups.id', 'startup_job.Startup_rowId')
    .innerJoin('role_job', 'Jobs.id', 'role_job.Job_rowId')
    .innerJoin('Roles', 'Roles.id', 'role_job.Role_rowId')
    .where('Locs.name', req.query.cityName)
    .then(function (jobs) {
      for (var i = 0; i < jobs.length; i++) {
        var job = {
          job_id: jobs.id,
          title: jobs.title,
          salary: (jobs.salmin + jobs.salmax)/2,
          loc: jobs.city,
          company: jobs.company,
          role: jobs.role
        };

        allJobs.push(job);
      }

      res.status(200).send(allJobs);
    });
  }
};

