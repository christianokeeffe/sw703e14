var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope', function($scope){
  $scope.content = {
    "billList": [
      {"item": "item 1",
       "expense": 55
      },
      {"item": "task 2",
       "expense": 56
      },
      {"item": "task 3",
       "expense": -200
      }
    ]
  }
  
  $scope.totalBill = function(){
    var total = 0;

    for (var i = 0 ; i <= $scope.content.billList.length-1; i++) {
      total = total + $scope.content.billList[i].expense;
    }

    return total.toString();
  };

  }]);