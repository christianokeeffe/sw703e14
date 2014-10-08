var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope','usersLoginFactory','formatRequest','$rootScope','$location', function($scope, usersLoginFactory,formatRequest,$rootScope,$location){
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
        $rootScope.currentUser = response.data;
        $location.path("/");
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };
  }]);