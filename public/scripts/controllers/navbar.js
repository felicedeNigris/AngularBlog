app.controller('NavCtrlr',function($scope, $location, Auth){

  $scope.signedIn = Auth.signedIn;
  $scope.currentUser = Auth.user;
  $scope.authState = function(signedIn){
    var loggedState = $scope.signedIn.$onAuth(function(authData){
      $scope.authData = authData;
    });
    return authData;
  };

  $scope.logout = function(){
    Auth.logout();
    console.log("Logged Out!");
    $location.path('/');
  };

});