var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope','usersFactory', 'authenticationSvc','formatRequest' function($scope, userFactory, formatRequest){
  $scope.users = {};
  $scope.page = "";

  $scope.Login = function(inputUser, inputPassword){
    var geturl = {};
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
      // taget fra stackoverflow
      var sessionTimeout = 1; //hours
      var loginDuration = new Date();
      loginDuration.setTime(loginDuration.getTime()+(sessionTimeout*60*60*1000));
      document.cookie = "CrewCentreSession=Valid; "+loginDuration.toGMTString()+"; path=/";
      //  slut
      self.location.href = page;

    }
    else {
      // error
    }
  }
  };
  }]);