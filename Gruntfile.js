'use strict';

module.exports = function (grunt) {

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
          '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
          ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        clean: {
            files: ['dist']
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['bower_components/requirejs/require.js', '<%= concat.dist.dest %>'],
                dest: 'dist/encoda.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/encoda.min.js'
            }
        },
        jasmine: {
            test: {
                src: ['app/**/*.js', '!app/config.js'],
                options: {
                    specs: 'test/**/*Spec.js',
                    helpers: 'test/*Helper.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'app/config.js',
                        requireConfig: {
                            baseUrl: 'app/'
                        }
                    }
                }
            }
        },
        karma: {
            karma: {
                configFile: 'karma.conf.js'
            }
        },
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            app: {
                options: {
                    jshintrc: 'app/.jshintrc'
                },
                src: ['app/**/*.js']
            },
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/**/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile']
            },
            src: {
                files: ['app/**/*.js'],
                tasks: ['jshint:src', 'jasmine']
            },
            test: {
                files: ['test/**/*.js'],
                tasks: ['jshint:test', 'jasmine']
            },
        },
        requirejs: {
            compile: {
                options: {
                    name: 'config',
                    mainConfigFile: 'app/config.js',
                    out: '<%= concat.dist.dest %>',
                    optimize: 'none'
                }
            },
            prod: {
                options: {
                    baseUrl: 'app',
                    name: '../bower_components/almond/almond',
                    out: 'dist/encoda.min.js',
                    include: ['encoda'],
                    wrap: {
                        startFile: "build/wrap.start",
                        endFile: "build/wrap.end"
                    }
                }
            }
        },
        connect: {
            development: {
                options: {
                    keepalive: true,
                    middleware: function (connect, options) {
                        return [
                            function (req, res, next) {
                                if (/.js/.test(req.url)) {
                                    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8');
                                }
                                return next();
                            },
                          connect.static(options.base)
                        ];
                    }
                }
            },
            production: {
                options: {
                    keepalive: true,
                    port: 8000,
                    middleware: function (connect, options) {
                        return [
                          // rewrite requirejs to the compiled version
                          function (req, res, next) {
                              if (req.url === '/bower_components/requirejs/require.js') {
                                  req.url = '/dist/encoda.min.js';
                              }
                              next();
                          },
                          connect.static(options.base),

                        ];
                    }
                }
            }
        },
        jsdoc: {
            dist: {
                src: ['app/**/*.js'],
                dest: 'docs'
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['jshint', 'jasmine', 'clean', 'requirejs:compile', 'concat', 'uglify']);
    grunt.registerTask('preview', ['connect:development']);
    grunt.registerTask('preview-live', ['default', 'connect:production']);
    grunt.registerTask('test', ['karma']);
    grunt.registerTask('docs', ['jsdoc:dist']);
    
    grunt.registerTask('custom', 'My custom task description.', function() {
        var fs = require('fs');
        var fileName = './package.json';
        var file = require(fileName);
        file.authors = [{'name': 'marina', 'email':'marina@gmail.com'},2,3,4];

        grunt.file.write(fileName, JSON.stringify(file, null, 2));

        //fs.writeFile(fileName, );
        
        /*fs.writeFile(fileName, JSON.stringify(file), function (err) {
            if (err) return console.log(err)
            console.log(JSON.stringify(file))
            console.log('writing to ' + fileName)
        });*/

        grunt.log.writeln('Currently running the "default" task.');
    });
};
