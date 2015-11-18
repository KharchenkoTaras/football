/*jslint node: true */
"use strict";


module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        processhtml: {
            options: {
                data: {
                    message: 'Process Html'
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
            libs: {
                expand: true,
                cwd: 'src/libs/',
                src: ['**/*.min.js', '**/*-min.js'],
                dest: 'dist/libs',
                filter: 'isFile',
            },
            debug: {
                expand: true,
                cwd: 'src/',
                src: ['app/**/*.js', 'common/**/*.js', 'index.html'],
                dest: 'dist/',
                filter: 'isFile',
            },
            templates: {
                expand: true,
                cwd: 'tmp/',
                src: ['templates.js'],
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
            },
            dist: {
                src: [ 'dist' ]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/common/**/*.js', 'src/app/app.js', 'src/app/services/*.js', 'src/app/controllers/*.js', 'tmp/*.js' ],
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
                    "dist/assets/css/app.css": "src/assets/css/app.less"
                }
            },
            relaese: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/assets/css/app.css": "src/assets/css/app.less"
                }
            }
        },

        watch: {
            dev: {
                files: [ 'Gruntfile.js', 'src/**/*.js', 'src/**/*.html', 'src/assets/**/*.less'],
                tasks: [ 'clean:dist', 'jshint', 'copy:libs', 'html2js:dist', 'copy:debug', 'copy:templates', 'less:debug', 'clean:temp'
                ],
                options: {
                    atBegin: true
                }
            },
            min: {
                files: [ 'Gruntfile.js', 'src/**/*.js', 'src/**/*.html', 'src/assets/**/*.less' ],
                tasks: [ 'clean:dist', 'jshint', 'copy:libs', 'html2js:dist', 'concat:dist', 'uglify:dist', 'processhtml', 'less:relaese', 'clean:temp'],
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

    grunt.registerTask('debug', [ 'bower', 'connect:server', 'watch:dev' ]);
    grunt.registerTask('release', [ 'bower', 'connect:server', 'watch:min' ]);
};