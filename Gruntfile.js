module.exports = function(grunt) { 
  grunt.initConfig({ 
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      build: "dist",
    },
    source: {
      js: ['src/javascript/function.js', 'src/javascript/main.js', 'src/javascript/window.js']
    },
    concat: { 
      options: {
        banner: '/*\n*  <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n*  Created by <%= pkg.author.name %> \n*  License <%= pkg.license.type %> \n*  <%= pkg.author.site %>\n */\n',
      },
      dist: {
        src: ['<%= source.js %>'],
        dest: '<%= meta.build %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        report: 'gzip',
        banner: '/*\n*  <%= pkg.name %> v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> \n*  Created by <%= pkg.author.name %> \n*  License <%= pkg.license.type %> \n*  <%= pkg.author.site %>\n */\n',
      },
      dist: {
        files: {
          '<%= meta.build %>/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat','uglify']);
};