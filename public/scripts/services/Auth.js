angular.module('AuthService',[])
  .factory('Auth', function($firebaseAuth, $firebaseArray){

  var ref = new Firebase("https://ngblogapp.firebaseio.com/");
  var authObj = $firebaseAuth(ref);
  var authData = authObj.$getAuth(); //firebase auth data when you login 

  var Auth = {
    user:{},

    createProfile: function(authData , user){
      var profile ={
        name: user.name,
        email: user.email
      };
     
        return $firebaseArray(ref.child('user')).$add({id: authData.uid, profile: profile});
    },
    login: function(user){
      return authObj.$authWithPassword(
        {email: user.email, password: user.password}
      ).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        return authData; //check getAuth status
      }).then(function(authData){
        location.reload(); // reload after login
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    },
    register: function(user){
      return authObj.$createUser({email: user.email, password: user.password})
      .then(function(userData) {
        console.log("User " + userData.uid + " created successfully!");
        return authObj.$authWithPassword({
          email: user.email,
          password: user.password,
        });
      }).then(function(authData) {
        console.log("Logged in as:", authData.uid);
        location.reload();
        return Auth.createProfile(authData, user);
      }).catch(function(error) {
        console.error("Error: ", error);
      });
    },
    logout: function(){
      authObj.$unauth(); //logout method
      location.reload(); //reload page
    },
    changePassword: function(user){
      return authObj.$changePassword({email: user.email, oldPassword: user.oldpass, newPassword: user.newpass});
    },
    signedIn: function(){
      var  signedin = authData === null ? false : true; //check to see if you are logged in
      console.log("signed in status is " + signedin);
      return signedin;
    }
  }; // end Auth
  if (authData) {
    console.log("Logged in as:", authData.uid);
    
    console.log("Logged out");
  }
  return Auth;
});



