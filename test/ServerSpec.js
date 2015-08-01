var mysql = require('mysql');
var expect = require('chai').expect;
var request = require('request');
var path = require('path');
var server = require('../server/server').app;


describe('Testing Suite', function() {

  describe("Database Tests", function() {  
    var dbConnection;

    beforeEach(function(done) {
      dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "jobs"
      });
      dbConnection.connect();
      done();
    });

    afterEach(function() {
      dbConnection.end();
    });

    it("Should have tables in the database", function(done) {
      var queryString = "SHOW TABLES";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results).to.not.equal(undefined);
        done();
      });
    });

    it("Should have the correct number of tables in the database", function(done) {
      var TABLES_COUNT = 8;
      var queryString = "SHOW TABLES";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results.length).to.equal(TABLES_COUNT);
        done();
      });
    });

    it("Should have table named links", function(done) {
      var queryString = "SELECT * FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results).to.not.equal(undefined);
        done();
      });
    });

    it("Should have columns in table named links", function(done) {
      var queryString = "SHOW COLUMNS FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results.length).to.be.greaterThan(0);
        done();
      });
    });

    it("Should have a primary key in the first column in table named links", function(done) {
      var queryString = "SHOW COLUMNS FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results[0].Key).to.be.equal('PRI');
        done();
      });
    });

    it("Should have table named locations", function(done) {
      var queryString = "SELECT * FROM locations";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results).to.not.equal(undefined);
        done();
      });
    });

    it("Should have columns in table named locations", function(done) {
      var queryString = "SHOW COLUMNS FROM locations";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }
        expect(results.length).to.be.greaterThan(0);
        done();
      });
    });

    it("Should have a jobCount column in table named locations", function(done) {
      var COLUMN_TARGET_NAME = "jobCount";
      var queryString = "SHOW COLUMNS FROM locations";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        var columnFound = true;
        for (var i = 0, limit = results.length; i < limit; i++) {
          for (var key in results[i]) {
            if (results[i][key] === COLUMN_TARGET_NAME) {
              columnFound = true;
            }
          }
        }
        expect(columnFound).to.equal(true);
        done();
      });
    });

/******************************************************************************
 * Tests for localhost ONLY below this block
 * Travis CI does not have data to execute these tests
 * Comment out before commiting
 *****************************************************************************/
    // it("Should have data rows in table named links", function(done) {
    //   var queryString = "SELECT * FROM links";
    //   var queryArgs = [];

    //   dbConnection.query(queryString, queryArgs, function(err, results) {
    //     expect(results.length).to.be.greaterThan(0);
    //     console.log('results.length', results.length);
    //     done();
    //   });
    // });

    // it('Should respond to GET requests for /api/jobs with a 200 status code', function(done) {
    //   request("http://localhost:8080/", function(error, response, body) {
    //     if (error) {
    //       throw error;
    //     }

    //     expect(response.statusCode).to.equal(200);
    //     done();
    //   });
    // });

  });

});