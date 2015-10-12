
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
            //controller: 'ShowPostController'
            controller: 'postController'
        }).when('/post/:id',{
            templateUrl:'../views/singlepost.html',
            controller: 'SinglePostController'
        }).when('/page/:id',{
            templateUrl:'../views/page.html',
            controller: 'postController' //'PageController'
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
        getPosts: function(postId){
          return blogPostsArray;
        },
        addPost: function(newpost){
          newpost.datetime = Firebase.ServerValue.TIMESTAMP;
          return blogPostsArray.$add(newpost); //push to array
        }
      };
  }]);
  
  
  app.controller('postController',["$scope", "$location", "Blog",function($scope, $location, Blog){
    
    $scope.posts = Blog.getPosts(); //All blog posts


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
  app.controller('PageController', ['$scope', '$http', '$routeParams', '' ,function($scope,$http,$routeParams){
        $http.get('../../../data/pages.json').success(function(data){
            $scope.page = data[$routeParams.id];
            console.log(data[$routeParams.id].title);// prints the title of the page

        });
  }]);




