/*angular.module('Register',[])
  .controller('RegisterCtrl',function($scope, $firebaseSimpleLogin, FBURL){
    var fbRef = new Firebase(FBURL);

    $scope.simpleLogin = $firebaseSimpleLogin(fbRef);
    $scope.errors = [];
    $scope.registerUser = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    $scope.register = function(){
      var errors = [], user = $scope.registerUser;

      if(user.email === ''){
        errors.push('Please enter an email');
      }
      if(user.password === ''){
        errors.push('Password must not be blank');
      }
      else if(user.password !== $scope.registerUser.confirmPassword){
        errors.push('Passwords must match');
      }
      if(errors.length > 0){
        $scope.errors = errors;
        return;
      }

      var promise = $scope.simpleLogin.$createUser('email','password');

      promise.then(function(user){
        console.log(user);
      }, function(error){
        console.log(error);
      });
    };
  });*/