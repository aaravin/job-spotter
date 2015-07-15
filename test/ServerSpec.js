var mysql = require('mysql');
var expect = require('chai').expect;
var request = require('request');

var db = require('../db/config');
var Companies = require('../db/collections/companies');
var Company = require('../db/models/company');
var Links = require('../db/collections/links');
var Link = require('../db/models/link');
var Locations = require('../db/collections/locations');
var Location = require('../db/models/location');
var Titles = require('../db/collections/titles');
var Title = require('../db/models/title');
var Users = require('../db/collections/users');
var User = require('../db/models/user');

describe('', function() {

  beforeEach(function() {
    db.knex('users')
      .where('username', '=', 'Phillip')
      .del()
      .catch(function(error) {
        // uncomment when writing authentication tests
        // throw {
        //   type: 'DatabaseError',
        //   message: 'Failed to create test setup data'
        // };
      });
  });

  describe('Dummy Test:', function(){

    beforeEach(function(done){      // create a user that we can then log-in with
      done();
    });

    it('Creates User and Password', function(done) {
      // console.log("creating user Phillip");
      // new User({
      //     'username': 'Phillip',
      //     'password': 'Phillip'
      // }).save();
      expect(true).to.equal(true);
      done();
    });
  });

  describe("Database Tests", function() {
    var TABLES_COUNT = 8;
    
    var dbConnection;

    beforeEach(function(done) {
      dbConnection = mysql.createConnection({
        user: "root",
        password: "",
        database: "jobspotter"
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
        expect(results).to.not.equal(undefined);
        // console.log('results.length', results.length);
        done();
      });
    });

    it("Should have the correct number of tables in the database", function(done) {
      var queryString = "SHOW TABLES";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results.length).to.equal(TABLES_COUNT);
        // console.log('results.length', results.length);
        done();
      });
    });

    it("Should have table named links", function(done) {
      var queryString = "SELECT * FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results).to.not.equal(undefined);
        done();
      });
    });

    it("Should have columns in table named links", function(done) {
      var queryString = "SHOW COLUMNS FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results.length).to.be.greaterThan(0);
        // console.log('results', results);
        done();
      });
    });

    it("Should have a primary key in the first column in table named links", function(done) {
      var queryString = "SHOW COLUMNS FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results[0].Key).to.be.equal('PRI');
        console.log('results[0].Key', results[0].Key);
        done();
      });
    });

    it("Should have data rows in table named links", function(done) {
      var queryString = "SELECT * FROM links";
      var queryArgs = [];

      dbConnection.query(queryString, queryArgs, function(err, results) {
        expect(results.length).to.be.greaterThan(0);
        // console.log('results.length', results.length);
        done();
      });
    });

  });

});


