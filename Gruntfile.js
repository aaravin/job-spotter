// "use strict";
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    db_dump: {
      local: {
        options: {
          database: "jobspotter",
          user: "root",
          pass: "",
          host: "localhost",
          backup_to: "db/backups/local.sql"
        }
      }
    },

    shell: {
      multiple: {
        command: [
            'mysql.server start',
            'mysql -u root -e "DROP DATABASE IF EXISTS jobspotter"',
            'mysql -u root -e "CREATE DATABASE jobspotter"',
            'mysql -u root jobspotter < db/backups/local.sql'
        ].join('&&')
      },
      dbSetup: {
        command: [
          'node db/dbSetup.js',
          '.exit'
        ].join('&&')
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    jshint: {
      files: [
        '**/*.js',
      ],
      options: {
        force: 'true',
        // strict: 'true',
        ignores: [
          'node_modules/**/*.js',
          '**/node_modules/**/*.js',
          'client/lib/**/*.js'
        ]
      }
    },

    "bower-install-simple": {
      options: {
        color: true,
        directory: 'client/lib'
      },
      "prod": {
        options: {
          production: true
        }
      },
      "dev": {
        options: {
          production: false
        }
      }
    },

    watch: {
      scripts: {
        files: [
          '**/*.js',
          './*.js',
        ],
        tasks: [
          'jshint',
        ]
      },
    },

    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-bower-install-simple');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('mon', [
    'jshint',
    'concurrent'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'bower-install-simple',
    'concurrent'
  ]);

  grunt.registerTask('backup', ['db_dump']);        // Save current MySQL data as pre-fill.
  grunt.registerTask('reset', ['shell:multiple']);  // Reset DB with pre-fill data.
  grunt.registerTask('dbInit', ['shell:dbSetup']);  // Initialize the database
};
