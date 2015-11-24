
var app=angular.module('myBlogApp',
  [
  'ngRoute',
  'firebase',
  'app.directives', //navbar directive
  'AuthService', //Auth service
  ])
    .constant('FBURL', "https://ngblogapp.firebaseio.com/posts") //fburl
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: '../views/posts.html',
            controller: 'postController'
        }).when('/post/:postId',{
            templateUrl:'../views/singlepost.html',
            controller: 'postController'
        }).when('/page/:postId',{
            templateUrl:'../views/page.html',
            controller: 'postController' //'PageController'
        }).when('/create',{
            templateUrl:'../views/createaPost.html',
            controller:'postController',
        }).when('/edit/:postId',{
            templateUrl:'../views/edit.html',
            controller:'postController'
        }).when('/register/',{
            templateUrl:'../views/Register.html',
            controller:'AuthController'
        }).when('/login/',{
            templateUrl:'../views/Login.html',
            controller:'AuthController'
        }).otherwise({
          redirectTo: '/'
        });
    }
  ]);
app.factory("Blog",["$firebaseArray","$routeParams", function($firebaseArray, $routeParams){
  
  var ref = new Firebase("https://ngblogapp.firebaseio.com/posts");// FIREBASE OBJ  
  var blogPostsArray = $firebaseArray(ref);
    return{

      id: $routeParams.postId,

      allPosts: blogPostsArray, // all fb objects

      addPost: function(newpost){
        newpost.datetime = Firebase.ServerValue.TIMESTAMP;
        return blogPostsArray.$add(newpost); //push to array
      }
    };
  }]);


  
app.controller('postController',["$scope", "$location","$routeParams","Blog","FBURL", "$firebaseObject", function($scope,$location,$routeParams,Blog,FBURL,$firebaseObject){
  
  $scope.posts = Blog.allPosts; //All blog posts
  var postId = $routeParams.postId;

  if(postId){
    $scope.selectedPost = getPost(postId); // gets unique object based on its id with get post function
  }

  function getPost(postId){
    var ref = new Firebase(FBURL + "/" +postId);
    return $firebaseObject(ref);
  }

  $scope.addPost = function(newpost){
    Blog.addPost($scope.newpost);
    //$location.path('/'); //redirects to home page
    console.log(newpost);
    console.log($scope.posts); // all posts
    $scope.newpost ={}; //reset the message
  };

  $scope.currentPost = function(postId){
    Blog.getPost(postId);
    console.log(postId);
  };

  $scope.editPost = function(post){
    $scope.selectedPost.$save(post);
    $location.path('/');
  };

}]);

/*
app.controller("AuthorizedUser",["$scope", "$firebaseAuth", "FBURL",
  function($scope, $firebaseAuth, FBURL){
    var ref = new Firebase(FBURL);

    //auth object
    $scope.authObj = $firebaseAuth(ref);
   
    //create a user
    $scope.authObj.$createUser({
      email: "",
      password: ""
    }).then(function(userData){
        console.log("User " + userData.uid + " created successfully!");
        return $scope.authObj.$authWithPassword({
          email: "my@email.com",
          password: "mypassword"
        });
    }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Error: ", error);
});

}]);*/



