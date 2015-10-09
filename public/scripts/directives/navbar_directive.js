angular.module('app.directives', [])
    .directive('navigationbar',function(){

        return{
            controller: ['$scope', '$http', function($scope, $http){
                $http.get('../../../data/pages.json').success(function(data){
                    $scope.pages = data;
                });


            }],

            restrict:'E',
    
            templateUrl:'../../views/navbar.html',
            replace: true
        };
    });