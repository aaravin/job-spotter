var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;
var dbname = process.env.DBNAME || 'jobs';
var dbuser = process.env.DBUSER || 'root';
var dbpassword = process.env.DBPASSWORD || '';
var dbSchemaUtil = require('./dbSchemaUtil.js');

module.exports = {
  setupSchema: function() {
    var knex = require('knex')({
      client: 'mysql',
      connection: {
        host: host,
        user: dbuser,
        password: dbpassword,
        database: dbname,
        charset: 'utf8',
        port: port
      }
    });

    console.log("Dropping tables...");
    knex.raw('SET FOREIGN_KEY_CHECKS = 0').then(function() {
      knex.raw('DROP TABLE users').then(function() {
        knex.raw('DROP TABLE titles').then(function() {
          knex.raw('DROP TABLE companies').then(function() {
            knex.raw('DROP TABLE locations').then(function() {
              knex.raw('DROP TABLE links').then(function() {
                knex.raw('DROP TABLE titles_companies').then(function() {
                  knex.raw('DROP TABLE titles_locations').then(function() {
                    knex.raw('DROP TABLE companies_locations').then(function() {
                      knex.raw('SET FOREIGN_KEY_CHECKS = 1').then(function() {
                        console.log("Dropped!");
                        console.log("Setting up schema...");
                        dbSchemaUtil.setupSchema();                        
                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    });
  }
};