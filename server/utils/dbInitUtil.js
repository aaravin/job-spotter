var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;
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
        charset: 'utf8',
        port: port
      }
    });

    console.log("Dropping database...");
    knex.raw('DROP DATABASE jobs').then(function() {
      console.log("Dropped!");
      console.log("Creating database...");
      knex.raw('CREATE DATABASE jobs').then(function() {
        console.log("Created!");
        console.log("Setting up schema...");
        dbSchemaUtil.setupSchema();
      })
    });
  }
};