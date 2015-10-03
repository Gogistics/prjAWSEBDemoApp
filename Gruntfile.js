/* Grunt Tasks  */
module.exports = function(grunt){
    grunt.initConfig({
        // basic setting
        pkg: grunt.file.readJSON('package.json'),

	// check JS code
	jshint: {
	    files: ['Gruntfile.js', 'public/javascripts/*.js'],
	    options: {
	        globals: {
			    jQuery: true,
			},
	    },
	},
        
        // name of plugin
	cssmin:{
	    combine: {
	        files: {
		    'public/stylesheets/main.min.css': ['public/stylesheets/style.css', 'public/stylesheets/index.css'],
		},
	    },
	},

	//
	uglify:{
	    options: {
	        banner: '\/\*\! \<\%\= pkg.name \%\> \<\%\= grunt.template.today\(\"dd-mm-yyyy\"\) \%\> \*\/',
	    },
            combine: {
                files: {
                    'public/javascripts/main.min.js': ['public/javascripts/index.js'],
                },
            },
        },
    });


    // load the plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['jshint', 'cssmin', 'uglify']);
};