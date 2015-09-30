module.exports = function(grunt){
  grunt.initConfig({
  
    //package json
    pkg: grunt.file.readJSON('package.json'),
   
    // sass compliler 
    sass: {                              
      dist: {                            
        options: {                       
          style: 'compressed'
        },
        files: {                         
          'public/styles/css/styles.css': 'public/styles/sass/styles.scss', // 'destination': 'source' 
        }
      }
    },
    // jade compiler
    jade:{
      compile:{
        options:{
          data:{
            debug:false
          }
        },
        files:{
          'public/views/index.html':'public/views/index.jade',
        }
      }
    },
    //watch tasks
    watch:{
      files:['public/views/*.jade', 'public/styles/sass/*.scss'],
      tasks:['sass','jade'],
    }
});
    //load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');//load sass compiler
    grunt.loadNpmTasks('grunt-contrib-jade'); // load jade compiler
    grunt.loadNpmTasks('grunt-contrib-watch');//load watch plugin
    grunt.registerTask('dist', ['sass','jade']);
    grunt.registerTask('default', ['watch']);
};
