var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope', function($scope){
  $scope.content = {
    "users": [
      {"user": "Ivan",
       "password": "password"
      },
      {"user": "Bo",
       "password": "password"
      },
      {"user": "Rasmus",
       "password": "password"
      }
    ]
  }
  
  $scope.Login = function(inputUser, inputPassword){

    for (var i = 0 ; i <= $scope.content.users.length-1; i++) {
      if (angular.equals(inputUser, $scope.content.users[i].user) && angular.equals(inputPassword, $scope.content.users[i].password)) {
        //do somethink
      };
    }
  };
  }]);