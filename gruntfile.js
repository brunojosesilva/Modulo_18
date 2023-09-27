module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: { /* configura o less no grunt */
            development: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'
                }
            },
            production: { /* usado apenas em ambiente de producao */
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },

        watch: {
            less: {
                files: ['src/styles/**/*.less'], /* verifica qualquer pasta e qualquer arquivo mudando */
                tasks: ['less:development']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['pre-build/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'pre-build/index.html': 'src/index.html'
                }
            }
        },

        clean: ['pre-build'],

        uglify: {
            target: {
                files: {
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }

        // sass: {
        //     dist: {
        //         options: {
        //             style: 'compressed'
        //         },
        //         files: {
        //             'main2.css': 'main.scss'
        //         }
        //     }
        // },

        // concurrent: {
        //     target: ['less', 'sass']
        // }
    })

    // grunt.registerTask('ola', function() {
    //     const done = this.async();
    //     setTimeout(function(){
    //         console.log('Ola...');
    //         done();
    //     },3000);
    // })

    grunt.loadNpmTasks('grunt-contrib-less'); /* instala o suporte ao less no grunt */
    // grunt.loadNpmTasks('grunt-contrib-sass'); /* instala o sass no grunt */
    grunt.loadNpmTasks('grunt-concurrent'); /* instala o paralelo */
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'clean', 'uglify']); /* utilizado para ser feito apenas em ambiente de producao */
}