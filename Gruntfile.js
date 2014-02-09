module.exports = function(grunt) { 
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      build: "dist"
    },
    source: {
      js: ['src/javascript/Bricks.Main.js'
          ,'src/javascript/core/*'
          ,'src/javascript/modules/*'
          ,'src/javascript/plugins/*'
          , 'src/javascript/Bricks.Window.js'],
      css: ['src/stylesheet/*']
    },
    clean: {
      build: {
        src: ['<%= meta.build %>/*']
      }
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
        dest: '<%= meta.build %>/js/<%= pkg.name %>.js'
      },
      css: {
        src: ['<%= source.css %>'],
        dest: '<%= meta.build %>/css/<%= pkg.name %>.css'
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
          '<%= meta.build %>/js/<%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
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
          '<%= meta.build %>/css/<%= pkg.name %>.min.css': ['<%= concat.css.dest %>']
        }
      }
    },
    copy: {
      font: {
        expand: true,
        cwd: 'src/fonts/',
        src: '**',
        dest: '<%= meta.build %>/fonts/',
        flatten: true,
        filter: 'isFile'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.registerTask('default', ['clean', 'concat','uglify', 'cssmin', 'copy']);
};