var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope','usersLoginFactory','formatRequest', function($scope, usersLoginFactory,formatRequest){
$scope.user = {};
  $scope.Login = function(){
    var geturl = {};

    geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
          return $scope.Login();
         }, 10);
    }
    else
    { 
      geturl.user = $scope.user.userName;
      geturl.pass = $scope.user.password;
      usersLoginFactory.findUser(geturl,
      function (response) {
        $scope.users = response.data;
      });
      if(response.data != null) {
        //login
      }
      else {
        //error
      }
    }
  };
  }]);