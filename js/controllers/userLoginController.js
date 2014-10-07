var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope','usersFactory', 'authenticationSvc','formatRequest' function($scope, userFactory, formatRequest){
  $scope.users = {};
  $scope.page = "";

  $scope.Login = function(inputUser, inputPassword){
    var geturl = {};
    var tokens = [];
    geturl.endurl = "/"+inputUser+"/"+inputPassword;
  geturl = formatRequest.get({});
  if(geturl === undefined)
  {
    setTimeout(function(){
          return $scope.findUser();
       }, 10);
  }
  else
  { 

    usersFactory.findUser(geturl,
    function (response) {
      $scope.users = response.data;
    });
    if(response.data != null) {
      //login
      var expires = new Date();
      expires.setDate((new Date()).getDate() + 5);
      var token = jwt.encode({
          userName: inputUser,
          expires: expires
      }, app.get('jwtTokenSecret'));
        tokens.push(token);
        response.send(200, { access_token: token, userName: inputUser });
    }
    else {
      response.send(401, "Invalid credentials");
    }
  }
  };
  }]);