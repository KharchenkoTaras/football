/*jslint node: true */
"use strict";


module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        processhtml: {
            options: {
                data: {
                    message: 'Hello world!'
                }
            },
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
                }
            }
        },

        bower: {
            install: {
                options: {
                    install: true,
                    copy: false,
                    targetDir: './dist/libs',
                    cleanTargetDir: true
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: 'src/libs/',
                src: '**/*.min.js',
                dest: 'dist/libs',
                filter: 'isFile',
            },
            debug: {
                expand: true,
                cwd: 'src/',
                src: ['app/*.js', 'common/*.js', 'app/templates/*.html', 'index.html'],
                dest: 'dist/',
                filter: 'isFile',
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/app.min.js': [ 'tmp/tmp.app.js' ]

                },
                options: {
                    mangle: true
                }
            }
        },

        html2js: {
            dist: {
                src: [ 'src/app/templates/*.html' ],
                dest: 'tmp/templates.js'
            }
        },

        clean: {
            temp: {
                src: [ 'tmp' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [ 'src/app/*.js', 'tmp/*.js' ],
                dest: 'tmp/tmp.app.js'
            }
        },

        jshint: {
            all: [ 'Gruntfile.js', 'app/*.js', 'app/**/*.js' ]
        },

        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 8001
                }
            }
        },

        less: {
            debug: {
                files: {
                    "dist/assets/app.css": "src/assets/css/app.less"
                }
            },
            relaese: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/assets/app.css": "src/assets/css/app.less"
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'src/*.js', 'src/*.html' ],
                tasks: [ 'jshint', 'copy:debug', 'less:debug'],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', '*/*.js', '*.html', 'assets/*.less' ],
                tasks: [ 'jshint', 'html2js:dist', 'concat:dist', 'uglify:dist', 'clean:temp', 'processhtml', 'less:relaese' ],
                options: {
                    atBegin: true
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('dev', [ 'bower', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
};