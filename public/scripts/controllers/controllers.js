angular.module('app.controllers',['app.directives', 'blogService'])
    .controller('PostController', ['$scope', '$http', function($scope, $http){
        $http.get('../../../data/posts.json').success(function(data){
            $scope.posts = data;
        });
    }])
    .controller('SinglePostController', ['$scope', '$http', '$routeParams', function($scope,$http,$routeParams){
        $http.get('../../../data/posts.json').success(function(data){
            $scope.post = data[$routeParams.id];
        });
    }])
    .controller('PageController', ['$scope', '$http', '$routeParams' ,function($scope,$http,$routeParams){
        $http.get('../../../data/pages.json').success(function(data){
            $scope.page = data[$routeParams.id];
            console.log(data[$routeParams.id].title);// prints the title of the page
            console.log('active tab is' + activetab);
        });
        
    }])
    .controller('blogPostsController',["$scope","FURL", "$firebaseArray",function($scope, FURL, $firebaseArray){
        var ref = $firebaseArray(new Firebase(FURL));
        var fireblogPosts = ref.child('post'); //adds a child 'post' object to the fb array

        $scope.addPost = function(newpost){
            fireblogPosts.$add({text: newpost });
        };
    }]);

    