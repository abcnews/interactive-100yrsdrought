/*global module:false*/
module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		clean: {
			dev: ['.dev', 'src/tmp'],
			dist: ['dist', 'src/tmp']
		},

		jshint: {
			files: [
				'src/js/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		browserify: {
			options: {
				transform: ['hbsfy', 'brfs', 'deglobalify']
			},
			dev: {
				options: {
					debug: true
				},
				files: {
					'.dev/js/app.js': ['src/js/app.js']
				}
			},
			dist: {
				files: {
					'dist/js/app.js': ['src/js/app.js']
				}
			}
		},

		uglify: {
			dist: {
				files: [{
					expand: true,
					cwd: 'dist/js',
					src: '*.js',
					dest:'dist/js'
				}]
			}
		},

		dir2json: {
			dev: {
				root: 'src/data/',
				dest: '.dev/data/data.json',
				options: { space: '\t' }
			},
			dist: {
				root: 'src/data/',
				dest: 'dist/data/data.json'
			}
		},

		compass: {
			dev: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'src/tmp'
				}
			},
			dist: {
				options: {
					sassDir: 'src/scss',
					cssDir: 'src/tmp',
					environment: 'production'
				}
			},
		},

		copy: {
			filesdev: {
				files: [{
					expand: true,
					cwd: 'src/files',
					src: ['**'],
					dest: '.dev/files/'
				}]
			},
			files: {
				files: [{
					expand: true,
					cwd: 'src/files',
					src: ['**'],
					dest: 'dist/files/'
				}]
			},
			rootdev: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.*'],
					dest: '.dev/'
				}]
			},
			root: {
				files: [{
					expand: true,
					cwd: 'src/',
					src: ['*.*'],
					dest: 'dist/'
				}]
			}
		},

		connect: {
			dev: {
				options: {
					port: 8000,
					hostname: '*',
					base: '.dev/'
				}
			}
		},

		watch: {
			js: {
				files: 'src/js/**/*',
				tasks: ['jshint', 'browserify:dev'],
				interrupt: true
			},
			handlebars: {
				files: 'src/templates/*.hbs',
				tasks: ['browserify:dev'],
				interrupt: true
			},
			compass: {
				files: 'src/scss/**/*.scss',
				tasks: ['compass:dev','browserify:dev'],
				interrupt: true
			},
			data: {
				files: 'src/data/**/*',
				tasks: 'dir2json:dev',
				interrupt: true
			},
			files: {
				files: 'src/files/**/*',
				tasks: 'copy:filesdev',
				interrupt: true
			},
			root: {
				files: 'src/*.*',
				tasks: 'copy:rootdev',
				interrupt: true
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-dir2json');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.registerTask('dev', [
		'clean:dev',
		'jshint',
		'compass:dev',
		'browserify:dev',
		'dir2json:dev',
		'copy:filesdev',
		'copy:rootdev'
	]);

	grunt.registerTask('default', [
		'dev',
		'connect',
		'watch'
	]);

	grunt.registerTask('dist', [
		'clean:dist',
		'compass:dist',
		'jshint',
		'browserify:dist',
		'uglify:dist',
		'dir2json:dist',
		'copy:files',
		'copy:root'
	]);

};
