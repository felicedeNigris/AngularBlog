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
          pretty:true,
          data:{
            debug:false
          }
        },
        files:{
          'public/views/index.html':'public/views/index.jade',
          'public/views/posts.html':'public/views/posts.jade',
          'public/views/navbar.html':'public/views/navbar.jade',
          'public/views/singlepost.html':'public/views/singlepost.jade',
          'public/views/page.html':'public/views/page.jade',
          'public/views/createaPost.html':'public/views/createaPost.jade',
          'public/views/edit.html':'public/views/edit.jade',
          'public/views/Register.html':'public/views/Register.jade',
          'public/views/Login.html':'public/views/Login.jade',
          'public/views/footer_bar.html':'public/views/footer_bar.jade'
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

