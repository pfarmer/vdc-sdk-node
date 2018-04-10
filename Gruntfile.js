module.exports = function (grunt) {
  grunt.initConfig({
    files: ['SDK.js'],
    eslint: {
      src: '<%= files %>',
    },
    complexity: {
      generic: {
        src: '<%= files %>',
        options: {
          breakOnErrors: false,
          errorsOnly: false,               // show only maintainability errors
          cyclomatic: [3, 7, 12],          // or optionally a single value, like 3
          halstead: [8, 13, 20],           // or optionally a single value, like 8
          maintainability: 100,
          hideComplexFunctions: false,     // only display maintainability
          broadcast: false,                 // broadcast data over event-bus
        },
      },
    },
    watch: {
      files: '<%= files %>',
      tasks: ['complexity'],
    },
  });

  grunt.loadNpmTasks('grunt-complexity');
  grunt.loadNpmTasks('gruntify-eslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['eslint', 'complexity']);
  // grunt.registerTask('default', ['complexity']);
};
