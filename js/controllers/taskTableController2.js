var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController2', ['$scope', function($scope){
  $scope.content = {
    "dailyTasks": [
      {"task": "task 1"
      },
      {"task": "task 2"
      },
      {"task": "task 3"
      }
    ],
    "optimalTasks": [
      {"task": "task 4"
      },
      {"task": "task 5"
      },
      {"task": "task 6"
      }
    ]
  }

  

  }]);