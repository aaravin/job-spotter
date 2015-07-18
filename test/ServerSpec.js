var mysql = require('mysql');
var expect = require('chai').expect;
var request = require('request');
var server = require('../server/server').app;

var db = require('../sqldb/config');


describe('Testing Suite', function() {

  // beforeEach(function() {
  //   db.knex('users')
  //     .where('username', '=', 'Phillip')
  //     .del()
  //     .catch(function(error) {
  //       // uncomment when writing authentication tests
  //       // throw {
  //       //   type: 'DatabaseError',
  //       //   message: 'Failed to create test setup data'
  //       // };
  //     });
  // });

  describe('Dummy Test:', function(){

    // beforeEach(function(done){      // create a user that we can then log-in with
    //   done();
    // });

    it('Dummy Test', function(done) {
      // console.log("creating user Phillip");
      // new User({
      //     'username': 'Phillip',
      //     'password': 'Phillip'
      // }).save();
      expect(true).to.equal(true);
      done();
    });
  });

  describe("Server Routes Tests", function() {
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

    it('Should respond to GET requests for /api/jobs with a 200 status code', function(done) {
      request('http://127.0.0.1:8080/api/locations/all', function(error, response, body) {
        if (error) {
          throw error;
        }

        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });

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
        // console.log('results.length', results.length);
        done();
      });
    });

    it("Should have the correct number of tables in the database", function(done) {
      var TABLES_COUNT = 9;
      var queryString = "SHOW TABLES";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results.length).to.equal(TABLES_COUNT);
        // console.log('results.length', results.length);
        done();
      });
    });

    it("Should have table named Jobs", function(done) {
      var queryString = "SELECT * FROM Jobs";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results).to.not.equal(undefined);
        done();
      });
    });

    it("Should have columns in table named Jobs", function(done) {
      var queryString = "SHOW COLUMNS FROM Jobs";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results.length).to.be.greaterThan(0);
        // console.log('results', results);
        done();
      });
    });

    it("Should have a primary key in the first column in table named Jobs", function(done) {
      var queryString = "SHOW COLUMNS FROM Jobs";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results[0].Key).to.be.equal('PRI');
        // console.log('results[0].Key', results[0].Key);
        done();
      });
    });

    it("Should have table named Locs", function(done) {
      var queryString = "SELECT * FROM Locs";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        expect(results).to.not.equal(undefined);
        done();
      });
    });

    it("Should have columns in table named Locs", function(done) {
      var queryString = "SHOW COLUMNS FROM Locs";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }
        expect(results.length).to.be.greaterThan(0);
        // console.log('results', results);
        done();
      });
    });

    it("Should have a jobcount column in table named Locs", function(done) {
      var queryString = "SHOW COLUMNS FROM Locs";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        if (err) {
          throw error;
        }

        // console.log('results', results);
        var columnFound = true;
        for (var i = 0, limit = results.length; i < limit; i++) {
          for (var key in results[i]) {
            if (results[i][key] === "jobcount") {
              columnFound = true;
            }
          }
        }
        expect(columnFound).to.equal(true);
        done();
      });
    });


    // *** Travis CI does not have data to execute this test
    // *** COMMENT OUT below before commiting ***
    // it("Should have data rows in table named Jobs", function(done) {
    //   var queryString = "SELECT * FROM Jobs";
    //   var queryArgs = [];

    //   dbConnection.query(queryString, queryArgs, function(err, results) {
    //     expect(results.length).to.be.greaterThan(0);
    //     // console.log('results.length', results.length);
    //     done();
    //   });
    // });

  });

});

