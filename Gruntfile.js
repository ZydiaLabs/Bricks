module.exports = function(grunt) { 
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      build: "dist"
    },
    source: {
      js: ['src/javascript/NutBang.Main.js'
          ,'src/javascript/core/*'
          ,'src/javascript/modules/*'
          ,'src/javascript/plugins/*'
          , 'src/javascript/NutBang.Window.js'],
      css: ['src/stylesheet/*']
    },
    concat: { 
      options: {
        banner: '/*\n' +
                '*  <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                '*  Created by <%= pkg.author.name %> \n' +
                '*  License <%= pkg.license.type %> \n' +
                '*  <%= pkg.author.site %>\n' +
                '*/\n\n'
      },
      js: {
        src: ['<%= source.js %>'],
        dest: '<%= meta.build %>/<%= pkg.name %>.js'
      },
      css: {
        src: ['<%= source.css %>'],
        dest: '<%= meta.build %>/<%= pkg.name %>.css'
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        banner: '/*\n' +
                '*  <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                '*  Created by <%= pkg.author.name %> \n' +
                '*  License <%= pkg.license.type %> \n' +
                '*  <%= pkg.author.site %>\n' +
                '*/\n\n'
      },
      dist: {
        files: {
          '<%= meta.build %>/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    cssmin: {
      add_banner: {
        options: {
          report: 'gzip',
        banner: '/*\n' +
                '*  <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n' +
                '*  Created by <%= pkg.author.name %> \n' +
                '*  License <%= pkg.license.type %> \n' +
                '*  <%= pkg.author.site %>\n' +
                '*/\n\n'
        },
        files:{
          '<%= meta.build %>/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    watch: {
      stylesheets: {
        files: 'src/stylesheet/*',
        tasks: [ 'cssmin' ]
      },
      scripts: {
        files: 'src/javascript/*',
        tasks: [ 'concat' ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat','uglify', 'cssmin', 'watch']);
};