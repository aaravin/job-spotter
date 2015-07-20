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

db.knex.schema.hasTable('Jobs').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Jobs', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.text('description');
      table.float('equity_min');
      table.float('equity_max');
      table.float('salary_min');
      table.float('salary_max');
      table.string('currency', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('Locs').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Locs', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
      table.integer('jobcount', 11);
      table.float('latitude');
      table.float('longitude');
      table.float('avg_salary');
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('Roles').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Roles', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('Skills').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Skills', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('Startups').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('Startups', function (table) {
      table.uuid('id').primary();
      table.string('name', 255);
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('loc_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('loc_job', function (table) {
      table.uuid('id').primary();
      table.uuid('Job_rowId');//.references('id').inTable('Jobs');
      table.uuid('Loc_rowId');//.references('id').inTable('Locs');
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('role_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('role_job', function (table) {
      table.uuid('id').primary();
      table.uuid('Job_rowId');//.references('id').inTable('Jobs');
      table.uuid('Role_rowId');//.references('id').inTable('Roles');
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('skill_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('skill_job', function (table) {
      table.uuid('id').primary();
      table.uuid('Job_rowId');//.references('id').inTable('Jobs');
      table.uuid('Skill_rowId');//.references('id').inTable('Skills');
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

db.knex.schema.hasTable('startup_job').then(function (exists) {
  if (!exists) {
    db.knex.schema.createTable('startup_job', function (table) {
      table.uuid('id').primary();
      table.uuid('Job_rowId');//.references('id').inTable('Jobs');
      table.uuid('Startup_rowId');//.references('id').inTable('Startups');
      table.timestamps();
    }).then(function (table) {
      console.log('Create Table', table);
    }).catch(function (error) {
      console.log('Could not make table: Error:', error);
    });
  }
});

module.exports = db;