var Promise = require('bluebird');
var Location = require('../../db/models/location');
var Link = require('../../db/models/link');
var Company = require('../../db/models/company');
var db = require('../../db/config.js');
var _ = require('underscore');

module.exports = {

  buildJobs: function(jobs) {
    return _.map(jobs, function(job) {
      var jobInfo = {};

      jobInfo.link = job.link;
      jobInfo.skills = job.skills;
      jobInfo.salary_min = job.salary_min;
      jobInfo.salary_max = job.salary_max;
      jobInfo.salary_avg = (job.salary_min + job.salary_max)/2;
      jobInfo.equity = job.equity;
      jobInfo.location = job.city;
      jobInfo.title = job.title;
      jobInfo.company = job.company;

      return jobInfo;
    });
  },

  getJobsWithLocation: function (req, res, next) {
    console.log("Sending jobs to /api/jobs/ LOCATION SEARCH:",  req.query.location);

    db.knex.select('Links.id as id', 'Links.link as link', 'Links.skills as skills',
                   'Links.salary_min as salary_min', 'Links.salary_max as salary_max',
                   'Links.salary_avg as salary_avg', 'Links.equity as equity', 'Locations.city as city',
                   'Titles.title as title', 'Companies.name as company')
    .from('Locations')
    .leftJoin('Links', 'Links.title_id', 'Locations.id')
    .leftJoin('Titles', 'Titles.id', 'Links.title_id')
    .leftJoin('Companies', 'Companies.id', 'Links.company_id')
    .where('Locations.city', req.query.location)
    .then(function(jobs) {
      var jobsData = module.exports.buildJobs(jobs);
      res.status(200).send(jobsData);
    }); 
  },

  getJobsWithTitle: function(req, res, next) {
    console.log("Sending jobs to /api/jobs/ TITLE SEARCH:",  req.query.title);
    
    db.knex.select('Links.id as id', 'Links.link as link', 'Links.skills as skills',
                   'Links.salary_min as salary_min', 'Links.salary_max as salary_max',
                   'Links.salary_avg as salary_avg', 'Links.equity as equity', 'Locations.city as city',
                   'Titles.title as title', 'Companies.name as company')
    .from('Titles')
    .leftJoin('Links', 'Links.title_id', 'Titles.id')
    .leftJoin('Locations', 'Locations.id', 'Links.location_id')
    .leftJoin('Companies', 'Companies.id', 'Links.company_id')
    .where('Titles.title', req.query.title)
    .then(function(jobs) {
      var jobsData = module.exports.buildJobs(jobs);
      res.status(200).send(jobsData);
    });
  }, 

  getJobsWithBoth: function(req, res, next) {
    console.log("Sending jobs to /api/jobs/ TITLE & LOCATION SEARCH:",  req.query.title, req.query.location);
    
    db.knex.select('Links.id as id', 'Links.link as link', 'Links.skills as skills',
                   'Links.salary_min as salary_min', 'Links.salary_max as salary_max',
                   'Links.salary_avg as salary_avg', 'Links.equity as equity', 'Locations.city as city',
                   'Titles.title as title', 'Companies.name as company')
    .from('Titles')
    .leftJoin('Links', 'Links.title_id', 'Titles.id')
    .leftJoin('Locations', 'Locations.id', 'Links.location_id')
    .leftJoin('Companies', 'Companies.id', 'Links.company_id')
    .where('Titles.title', req.query.title)
    .andWhere('Locations.city', req.query.location)
    .then(function(jobs) {
      var jobsData = module.exports.buildJobs(jobs);
      res.status(200).send(jobsData);
    });
  },

};

