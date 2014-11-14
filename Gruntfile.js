module.exports = function(grunt) {

  // 1. All configuration goes here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          noCache: true
        },
        files: {
          'css/styles.css': 'scss/styles.scss',
        }
      }
    },
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      css: {
        files: 'scss/*.scss',
        tasks: ['sass', 'cssmin']
      },
      js: {
        files: ['js/*.js'],
        tasks: ['concat', 'uglify']
      },
    },
    browserSync: {
        bsFiles: {
            src : 'css/min/*.css'
        },
        options: {
            server: {
                baseDir: "./"
            },
            watchTask: true // < VERY important
        }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/jquery-1.11.1.min.js', 'js/bootstrap.min.js', 'js/skrollr.min.js', 'js/skrollr.menu.js', 'js/scripts.js' ],
        dest: 'js/site.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'js/min/site.min.js': ['js/site.js']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'css/min/styles.min.css': ['css/styles.css']
        }
      }
    }
  });

  // 3. Where we tell Grunt we plan to use this plug-in
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-jekyll');
  //grunt.loadNpmTasks('grunt-autoprefixer');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // 4. Where we tell Grunt what to do when we type "grunt" into the terminal
  grunt.registerTask('build', ['sass','concat', 'uglify', 'cssmin']);
  grunt.registerTask('default', ['build','browserSync', 'watch']);
};