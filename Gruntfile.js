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

    grunt.registerTask('update-contributors',
        'Update contributors',
        function() {
            var fs = require('fs');
            var packageJsonFileName = './package.json';
            var packageJsonFile = require(packageJsonFileName);
            var bowerJsonFileName = './bower.json';
            var bowerJsonFile = require(bowerJsonFileName);
            var done = this.async();
            var getTopContribs = require('top-gh-contribs');
            var oauthKey = process.env.GITHUB_OAUTH_KEY;


            grunt.log.writeln('Downloading release and contributor information from GitHub...');

            return getTopContribs({
                    user: 'fmtvp',
                    repo: 'tal',
                    oauthKey: oauthKey,
                    //sinceDate: timeSpan,
                    retry: true
                })
                .then(function (contributors) {
                    var contributorsString = '';
                    // write to authors

                    contributors.forEach(function(c) {
                        contributorsString += c.name + " <" + c.githubUrl + ">\n";
                    });

                    // write to authors.md
                    grunt.file.write('AUTHORS', contributorsString);

                    // write to package.json
                    packageJsonFile.contributors = contributorsString.trim().split("\n");
                    grunt.file.write(packageJsonFileName, JSON.stringify(packageJsonFile, null, 2));

                    //write to bower.json
                    bowerJsonFile.authors = contributorsString.trim().split("\n");
                    grunt.file.write(bowerJsonFileName, JSON.stringify(bowerJsonFile, null, 2));

                })
                .then(done).catch(function (error) {
                    if (error.http_status) {
                    grunt.log.writeln('\nGitHub API request returned status: ' + error.http_status);
                }

                if (error.ratelimit_limit) {
                    grunt.log.writeln('\nRate limit data: limit: %d, remaining: %d, reset: %s', error.ratelimit_limit, error.ratelimit_remaining, error.ratelimit_reset);
                }
                done(false);
            });

            /*
            var open = require('nodegit').Repository.open;

            open(".")
            .then(function(repo) {
                console.log(repo);
                return repo.getHeadCommit();
            });
            */

    });
};
