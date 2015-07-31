var db = require('../../db/config.js');
var Company = require('../../db/models/company');
var Link = require('../../db/models/link');
var Location = require('../../db/models/location');
var Title = require('../../db/models/title');
var User = require('../../db/models/user');
var bluebird = require('bluebird');
var request = require('request');

module.exports = {
  setupDB: function() {
    //CSTAT'S FILE BEGIN
    request('https://glacial-waters-2127.herokuapp.com/grabData', function(error, response, body) {

      var jobData = JSON.parse(JSON.parse(JSON.parse(body)));

      var cleanData = [];

      var testTag = jobData[0].jobsPerCompany[0].jobInfo;
      var testSalary = jobData[0].jobsPerCompany[0].jobSalary;

      var weirdSymbolCleanser = function(data) {
        //takes in a string, splits by the weird character, trims white space, returns array
        var result = data.split("·");

        for (var i = 0; i < result.length; i++) {
          result[i] = result[i].trim();
        }

        return result;
      };



      var salaryConverter = function(salary) {
        var removedSpecials = salary.replace(/\W/g, "");
        var result = removedSpecials.split("k");
        result[0] = result[0] + "000";
        result[1] = result[1] + "000";
        result[0] = parseInt(result[0], 10);
        result[1] = parseInt(result[1], 10);
        return result;
      };


      var theAngelCleaner = function(dirtyData) {
        //Takes in the data we get from Phantom JS Scraping and gets it ready to input into SQL
        var cleanData = [];

        for (var i = 0; i < dirtyData.length; i++) {
          var oldObj = dirtyData[i];

          for (var j = 0; j < oldObj.jobsPerCompany.length; j++) {
            var cleaned = oldObj.jobsPerCompany[j];
            cleaned.companyName = oldObj.companyName;
            cleanData.push(cleaned);
          }

        }

        return cleanData; 
      };


      var theAngelExtracter = function(foldedData) {
        //Takes in the cleaned data from theAngelCleaner and extracts data from the jobInfo
        var cleanData = [];

        for (var i = 0; i < foldedData.length; i++) {
          var unfoldedData = foldedData[i];
          var jobDetails = weirdSymbolCleanser(unfoldedData.jobInfo);
          var salaryDetails = weirdSymbolCleanser(unfoldedData.jobSalary);

          var salaryArray = salaryConverter(salaryDetails[0]);

          unfoldedData.jobWorkType = jobDetails[0];
          unfoldedData.jobLocation = jobDetails[1];
          unfoldedData.requiredSkills = "";
          unfoldedData.jobSalary = salaryDetails[0];
          unfoldedData.jobEquity = salaryDetails[1];
          unfoldedData.jobSalaryMin = salaryArray[0];
          unfoldedData.jobSalaryMax = salaryArray[1];
          unfoldedData.jobSalaryAvg = (salaryArray[0] + salaryArray[1]) / 2;

          if (isNaN(unfoldedData.jobSalaryMin)) {
            unfoldedData.jobSalaryMin = 0;
          }
          if (isNaN(unfoldedData.jobSalaryMax)) {
            unfoldedData.jobSalaryMax = 0;
          }
          if (isNaN(unfoldedData.jobSalaryAvg)) {
            unfoldedData.jobSalaryAvg = 0;
          }


          for (var j = 3; j < jobDetails.length; j++) {
            if (j !== jobDetails.length - 1) {
              unfoldedData.requiredSkills = unfoldedData.requiredSkills + jobDetails[j] + ", ";
            } else {
              unfoldedData.requiredSkills = unfoldedData.requiredSkills + jobDetails[j]
            }
          }

          if (unfoldedData.requiredSkills.length > 255) {
            unfoldedData.requiredSkills = unfoldedData.requiredSkills.substring(0, 255);
          }

          cleanData.push(unfoldedData);
        }

        return cleanData;
      };


      var testHolder = theAngelCleaner(jobData);

      // console.log(testHolder);

      var jobs = theAngelExtracter(testHolder);

      //CSTAT'S FILE END

      var promiseWhile = function(condition, action) {
          var resolver = bluebird.defer();
       
          var loop = function() {
              if (!condition()) return resolver.resolve();
              return bluebird.cast(action())
                  .then(loop)
                  .catch(resolver.reject);
          };
       
          process.nextTick(loop);
       
          return resolver.promise;
      };

      var link_id = 0;
      var title_id = 0;
      var company_id = 0;
      var location_id = 0;
      var promises = [];
      var i = 0;

      console.log(jobs[1663]);
      console.log("STARTING INSERTION INTO DB...");

      promiseWhile(function() {
        return i < jobs.length;
      }, function() {
        return new bluebird(function(resolve, reject) {
          var linkDB = new Link({link: jobs[i]["jobURL"]});
          linkDB.fetch().then(function(linkFound) {
            if (linkFound) {
              console.log("Duplicate Link");
              i++;
              resolve();
            } else {
              linkDB.set("skills", jobs[i]["requiredSkills"]);
              linkDB.set("salary_min", jobs[i]["jobSalaryMin"]);
              linkDB.set("salary_max", jobs[i]["jobSalaryMax"]);
              linkDB.set("salary_avg", jobs[i]["jobSalaryAvg"]);
              linkDB.set("equity", jobs[i]["jobEquity"]);
              linkDB.save().then(function(newLink) {
                link_id = newLink.get("id");
                var titleDB = new Title({title: jobs[i]["jobTitle"]});
                promises.push(titleDB.fetch().then(function(titleFound) {
                  if (titleFound) {
                    newLink.set("title_id", titleFound.get("id"));
                    title_id = titleFound.get("id");
                    promises.push(newLink.save());
                  } else {
                    promises.push(titleDB.save().then(function(newTitle) {
                      newLink.set("title_id", newTitle.get("id"));
                      title_id = newTitle.get("id");
                      promises.push(newLink.save());
                    }));
                  }
                }));

                bluebird.settle(promises).then(function() {
                  var companyDB = new Company({name: jobs[i]["companyName"]});
                  promises.push(companyDB.fetch().then(function(companyFound) {
                    if (companyFound) {
                      newLink.set("company_id", companyFound.get("id"));
                      company_id = companyFound.get("id");
                      promises.push(newLink.save());
                    } else {
                      promises.push(companyDB.save().then(function(newCompany) {
                        newLink.set("company_id", newCompany.get("id"));
                        company_id = newCompany.get("id");
                        promises.push(newLink.save());
                      }));
                    }
                  }));
                });

                bluebird.settle(promises).then(function() {
                  var locationDB = new Location({city: jobs[i]["jobLocation"]});
                  promises.push(locationDB.fetch().then(function(locationFound) {
                    if (locationFound) {
                      newLink.set("location_id", locationFound.get("id"));
                      location_id = locationFound.get("id");
                      promises.push(newLink.save());
                    } else {
                      promises.push(locationDB.save().then(function(newLocation) {
                        newLink.set("location_id", newLocation.get("id"));
                        location_id = newLocation.get("id");
                        promises.push(newLink.save());
                      }));
                    }
                  }));
                });

                bluebird.settle(promises).then(function() {
                  promises.push(db.knex('titles_companies').insert({title_id: title_id, company_id: company_id}).then(function() {

                  }));
                  promises.push(db.knex('titles_locations').insert({title_id: title_id, location_id: location_id}).then(function() {

                  }));
                  promises.push(db.knex('companies_locations').insert({company_id: company_id, location_id: location_id}).then(function() {

                  }));
                });

                bluebird.settle(promises).then(function() {
                  i++;
                  resolve();
                });
              });
            }
          });
        });
      }).then(function() {
        console.log("DONE INSERTING INTO DB");
      });
    });
  }
}