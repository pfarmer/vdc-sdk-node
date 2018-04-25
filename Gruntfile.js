module.exports = function (grunt) {
  grunt.initConfig({
    files: ['SDK.js', 'SDK/*'],
    eslint: {
      src: '<%= files %>',
    },
    complexity: {
      generic: {
        src: '<%= files %>',
        options: {
          breakOnErrors: false,
          errorsOnly: false,               // show only maintainability errors
          cyclomatic: [15, 20],          // or optionally a single value, like 3
          halstead: [15, 20],           // or optionally a single value, like 8
          maintainability: 100,
          hideComplexFunctions: false,     // only display maintainability
          broadcast: false,                 // broadcast data over event-bus
        },
      },
    },
    run: {
      jest: {
        cmd: 'jest',
        args: [
          '--coverage',
        ]
      }
    },
    watch: {
      files: '<%= files %>',
      tasks: ['run:jest', 'complexity'],
    },

  });

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-run');
  grunt.registerTask('default', ['eslint', 'complexity', 'run']);
  // grunt.registerTask('default', ['complexity']);
};
