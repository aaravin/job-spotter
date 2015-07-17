var Promise = require('bluebird');
var _ = require('underscore');
var Loc = require('../../sqldb/models/loc');
var Job = require('../../sqldb/models/job');
var Company = require('../../sqldb/models/startup');
var Role = require('../../sqldb/models/role');

module.exports = {
  getAllJobs: function (req, res, next) {
    console.log("Getting" + req.query.title + "jobs");
    // var jobsData = [];
    new Job()
    .where({name: req.query.title})
    .fetchAll({
      withRelated: ['startup','loc','role']
    })
    .then(function (jobs) {
      var loc, company, role;
      var jobsData = _.map(jobs.models, function(job) {
        var jobData = {};

        jobData.job_id = job.attributes.id;
        jobData.title = job.attributes.name;
        jobData.salary = (job.attributes.salary_min + job.attributes.salary_max)/2;

        loc = job.related('loc').at(0);
        company = job.related('startup').at(0);
        role = job.related('role').at(0);

        jobData.loc = loc === undefined ? loc : loc.attributes.name;
        jobData.company = company === undefined ? company : company.attributes.name;
        jobData.role = role === undefined ? role : role.attributes.name;

        return jobData;
      });

      console.log(jobsData.length);
      res.status(200).send(jobsData);
    });
  }

};

