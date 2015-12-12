app.controller('AuthController', function($scope, $location, Auth){

  $scope.register = function(user){
    Auth.register(user).then(function(){
      console.log("Register successfully!");
      $location.path("/");
    }, function(err){
      console.log("Error...");
    });
  };

  $scope.login = function(user){
    Auth.login(user).then(function(){
      console.log("Logged in successfully!");
      $location.path('/');
    }, function(err){
      console.log("Error...");
    });
  };

  $scope.changePassword = function(user){
    Auth.changePassword(user).then(function(){
      // Reset form
      $scope.user.email = '';
      $scope.user.oldPass = '';
      $scope.user.newPass = '';

      console.log("Password changed successfully!");
      alert("Password changed successfully!");
      $('#pasModal').modal('hide');
    }, function(err){
      console.log("Error...");
    });
  };

});