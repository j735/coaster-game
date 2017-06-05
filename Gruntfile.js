module.exports = function( grunt ) {

    function convertSassPath( dest, src ) {
        
        // Set the destination to a directory named "css"
        var path = require( 'path' )
            , splitDirs = src.split( '/' )
            ;

        splitDirs[ splitDirs.indexOf( 'scss' ) ] = 'css';

        return path.join( dest, splitDirs.join( '/' ) );
    }

    /* Configure */
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        // PLUGINS
        watch: {
            scss: {
                files: [ 'src/scss/**/*.scss' ],
                tasks: [ 'cssDev' ]
            } //,
            // style: {
            //     files: [
            //         '**/*'
            //     ],
            //     tasks: [ 'sftp:upload' ],
            //     options: {
            //         spawn: false //needed for watch event listener
            //     }
            // }
        },
        clean: {
            options: {
                force: true
            },
            css: [
                'src/css/*.css',
                'src/css/*.css.map'
            ],
            dist: [
                'dist'
            ]
        },
        uglify: {
            js: {
                files: {
                    'build/js/app.js': [ 'src/js/app.js' ]
                }
            }
        },
        sass: {
            dev: {
                options: {
                    sourcemap: 'auto',
                    style: 'expanded',
                    lineNumbers: true,
                    precision: 5,
                    loadPath: require( 'node-neat' ).includePaths
                },
                files: [{
                    expand: true,
                    cwd: 'src/scss',
                    src: 'style.scss',
                    dest: 'build/css',
                    ext: '.css',
                    rename: convertSassPath
                }]
            },
            // dist: {
            //     options: {
            //         sourcemap: 'none',
            //         style: 'compressed',
            //         lineNumbers: false,
            //         precision: 5,
            //         loadPath: require( 'node-neat' ).includePaths
            //     },
            //     files: [{
            //         expand: true,
            //         cwd: 'scss',
            //         src: 'style.scss',
            //         dest: 'dist/css',
            //         ext: '.css',
            //         rename: convertSassPath
            //     }]
            // }
            
        },
        imagemin: { 
            all: {
                options: {
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'img/src/',
                    src: [ '**/*.{png,jpg,gif}' ],
                    dest: 'img/dest/'
                }]
            }
        },
        secret: grunt.file.readJSON( 'secret.json' ),
        sftp: {
            upload: {
                files: {},
                options: {
                    path: '/',
                    host: '<%= secret.host %>',
                    port: '<%= secret.port %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>',
                    showProgress: true
                }
            }
        },
        // babel: {
        //     options: {
        //         sourceMap: true,
        //         presets: [ 'es2015' ]
        //     },
        //     dist: {
        //         files: {
        //             'dist/app.js': 'src/app.js'
        //         }
        //     }
        // }
    });

    require( 'matchdep' ).filterDev( 'grunt-*[^cli]' ).forEach( grunt.loadNpmTasks );

    grunt.event.on( 'watch', function( action, filepath, target ) {

        var files = { './': [ filepath ] };

        grunt.config( [ 'sftp', 'upload', 'files' ], files );
    });


    /* 
     *  CUSTOM TASKS
     */

     grunt.registerTask( 'build', 'Build out distributon version of site.', [
        'clean:dist',
        'copy',
        'sass:dist',
        'uglify'
    ]);

    grunt.registerTask( 'cssDev', 'Compile Scss files during development.', [
        'clean:css',
        'sass:dev'
    ]);
};
