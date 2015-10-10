
var app=angular.module('myBlogApp',
  [
  'ngRoute',
  'app.controllers',
  'app.directives',
  'firebase'
  ])
    .constant('FURL','https://https://ngblogapp.firebaseio.com/')
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: '../views/posts.html',
            controller: 'PostController'
        }).when('/post/:id',{
            templateUrl:'../views/singlepost.html',
            controller: 'SinglePostController'
        }).when('/page/:id',{
            templateUrl:'../views/page.html',
            controller: 'PageController'
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]);
/*  .service("blogPostService", function($firebaseArray){
    var ref = new Firebase('FURL');// FIREBASE OBJ  
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

  });*/

