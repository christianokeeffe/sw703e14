var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController2', ['$scope', function($scope){
  $scope.content = {
    "dailyTasks": [
      {"task": "task 1",
       "done": false
      },
      {"task": "task 2",
       "done": true
      },
      {"task": "task 3",
       "done": false
      }
    ],
    "optimalTasks": [
      {"task": "task 4",
       "done": true
      },
      {"task": "task 5",
       "done": false
      },
      {"task": "task 6",
       "done": false
      }
    ]
  }
  }]);