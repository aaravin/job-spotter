// "use strict";
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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
};
