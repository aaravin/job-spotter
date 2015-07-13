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
      console.log("creating user Phillip");
      new User({
          'username': 'Phillip',
          'password': 'Phillip'
      }).save();
      expect(true).to.equal(true);
      done();
    });
  });

});
