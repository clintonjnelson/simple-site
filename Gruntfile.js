module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jscs");

  var srcFiles = ["app/**/*.js", "server.js", "lib/*.js"];

  grunt.initConfig({
    jshint: {
      files: srcFiles,
      options: {
        sub: true
      }
    },
    jscs: {
      src: srcFiles,
      options: {
        config: '.jscsrc'
      }
    }
  });

  grunt.registerTask("default", [ "jshint", "jscs"]);
};
