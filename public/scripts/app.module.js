
var app=angular.module('myBlogApp',
  [
  'ngRoute',
  'app.controllers'
  ])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/',{
            templateUrl: '../views/posts.html',
            controller: 'PostController'
        }).otherwise({
          redirectTo: '/'
        });
    }

]);