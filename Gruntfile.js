// http://gruntjs.com/ - Make for javascript

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',

        // run jshint on the files, with the options described below
        jshint: {
            all: ['PJV.js', 'app.js', 'Gruntfile.js', 'test/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        qunit: {
            files: ["test/qunit-*.html"]
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('test', ['qunit']);
    grunt.registerTask('citest', ['jshint', 'test']);
};
