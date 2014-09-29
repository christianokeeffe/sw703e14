var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope', function($scope){
  $scope.content = {
    "billList": [
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
  
  }]);