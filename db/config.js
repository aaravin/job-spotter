var host = process.env.HOST || '127.0.0.1';
var port = process.env.DBPORT || 3306;
var dbname = process.env.DBNAME || 'jobs';
var dbuser = process.env.DBUSER || 'root';
var dbpassword = process.env.DBPASSWORD || '';


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

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username', 100).unique();
      table.string('password', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('titles').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('titles', function (table) {
      table.increments('id').primary();
      table.string('title', 100);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('companies').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('companies', function (table) {
      table.increments('id').primary();
      table.string('name', 100);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('locations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('locations', function (table) {
      table.increments('id').primary();
      table.string('city', 100);
      // table.string('state', 100);   //could not access this data
      // table.string('country', 50);  //could not access this data
      table.float('latitude', 10);
      table.float('longitude', 10);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('links').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('links', function (table) {
      table.increments('id').primary();
      table.string('link', 255);
      table.string('skills', 255); //only show first 255 chars of job skills
      table.integer('salary_min');
      table.integer('salary_max');
      table.integer('salary_avg');
      table.string('equity', 20);
      table.integer('title_id').unsigned().references('id').inTable('titles');
      table.integer('company_id').unsigned().references('id').inTable('companies');
      table.integer('location_id').unsigned().references('id').inTable('locations');
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('titles_companies').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('titles_companies', function (table) {
      table.integer('title_id').unsigned().references('id').inTable('titles');
      table.integer('company_id').unsigned().references('id').inTable('companies');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('titles_locations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('titles_locations', function (table) {
      table.integer('title_id').unsigned().references('id').inTable('titles');
      table.integer('location_id').unsigned().references('id').inTable('locations');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('companies_locations').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('companies_locations', function (table) {
      table.integer('company_id').unsigned().references('id').inTable('companies');
      table.integer('location_id').unsigned().references('id').inTable('locations');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;