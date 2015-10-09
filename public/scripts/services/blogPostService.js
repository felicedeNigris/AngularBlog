

angular.module('blogService',['firebase','myBlogApp', 'FURL'])
  .service("blogPostService", function($firebaseArray){
    var ref = new Firebase('https://https://ngblogapp.firebaseio.com/');// FIREBASE OBJ  
    var blogPostsArray = $firebaseArray(ref);

    this.getPosts = function(){
      return blogPostsArray; // Read data base
    };

    this.addblogPost = function(newpost){
      return blogPostsArray.$add(newpost); //push to array
    };

    this.updateblogPosts = function(post){
      return blogPostsArray.$save(post); // saves post state 
    };

  });