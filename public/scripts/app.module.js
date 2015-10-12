
var app=angular.module('myBlogApp',
  [
  'ngRoute',
  'app.controllers',
  'app.directives',
  'firebase'
  ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: '../views/posts.html',
            controller: 'postController'
        }).when('/post/:postId',{
            templateUrl:'../views/singlepost.html',
            controller: 'postController'
        }).when('/page/:postId',{
            templateUrl:'../views/page.html',
            controller: 'PageController' //'PageController'
        }).when('/create',{
            templateUrl:'../views/createaPost.html',
            controller:'postController'
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]);
app.factory("Blog",["$firebaseArray", function($firebaseArray){
  
    var ref = new Firebase("https://ngblogapp.firebaseio.com/posts");// FIREBASE OBJ  
    var blogPostsArray = $firebaseArray(ref);
    
      return{

        allPosts: blogPostsArray, // all fb objects

        getPost: function(postId){
          return $firebaseArray((ref).child(postId)); //returns fb object based on id tag
        },

        addPost: function(newpost){
          newpost.datetime = Firebase.ServerValue.TIMESTAMP;
          return blogPostsArray.$add(newpost); //push to array
        }

      };

  }]);
  
  
  app.controller('postController',["$scope", "$location", "Blog",function($scope, $location, Blog){
    
    $scope.posts = Blog.allPosts; //All blog posts


    $scope.addPost = function(newpost){
      Blog.addPost($scope.newpost);
      //$location.path('/'); //redirects to home page
      console.log(newpost);
      console.log($scope.posts); // all posts
      $scope.newpost ={}; //reset the message
    };

  }]);

  app.controller('editPostCTRLR',["$scope","Blog",function($scope){
    ///something here
  }]);


  app.controller('PageController', ['$scope','$routeParams', 'Blog' ,function($scope,Blog,$routeParams){

  $scope.searchPosts = '';

  $scope.posts = Blog.allPosts; //all posts

  $scope.listMode = true;

  if($routeParams.postId){
    var post = Blog.getPost($routeParams.postId).$asObject(); // get routeParams postId
    $scope.listMode = false;
    setSelectedPost(post);
  }

  function setSelectedPost(post){
   // $scope.selectedPost = post;

  }



  }]);

/*
function setSelectedTask(task) {
    $scope.selectedTask = task;
    
    // We check isTaskCreator only if user signedIn 
    // so we don't have to check every time normal guests open the task
    if($scope.signedIn()) {
      // Check if the current login user is the creator of selected task
      $scope.isTaskCreator = Task.isCreator;

      // Check if the selectedTask is open
      $scope.isOpen = Task.isOpen;
    }

*/