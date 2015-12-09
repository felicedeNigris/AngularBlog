
var app=angular.module('myBlogApp',
  [
  'ngRoute',
  'firebase',
  'angular-filepicker',//angular filepicker
  'app.directives', //navbar directive
  'AuthService', //Auth service
  'FilePicker'//File Picker Service
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


  
app.controller('postController',["$scope", "$location","$routeParams","Blog","FBURL", "$firebaseObject","$firebaseArray","FilePicker", "$window", function($scope,$location,$routeParams,Blog,FBURL,$firebaseObject,$firebaseArray,FilePicker,$window){
  
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
    $location.path('/'); //redirects to home page
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
  
  $scope.files = JSON.parse($window.localStorage.getItem('files') || '[]');


  $scope.pickFile = function(){
      FilePicker.pick(
          {mimetype: 'image/*'},
          $scope.onSuccess
      );
  };

  $scope.onSuccess = function(Blob,newpost){
    $scope.files.push(Blob); //push to filepicker
    $scope.newpost['photo'] = Blob.url; //adds photo url to newpost.photo
    console.log(Blob.url);
    $window.localStorage.setItem('files', JSON.stringify($scope.files));
};

}]);

