var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var timeSincepaid = 1409565600;
  var timeSincelastMonth = 1409565600;

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
    ],
    "addedbills": [
    {"item": "item 42",
       "expense": 42
      }
    ]
  }
  $rootScope.test = function(){
    var temp = 1;
    $rootScope.removeInBillList("task 2");
  };

  $rootScope.addbill = function(name, price){
    var inList = false;
    for (var i = 0; i < $scope.content.addedbills.length && !inList; i++) {
      if ($scope.content.addedbills[i].item === name) {
        inList = true;
        $scope.content.addedbills[i].expense += price;
      }
    }
    if (!inList) {
      alert("error in finding " + name + " in added bill list");
    };
  };

  $rootScope.resetAddedBills = function(){
    $scope.content.addedbills = {};
  };


  $rootScope.removeInBillList = function(name){
    var inList = false
    for (var i = 0 ; i <= $scope.content.billList.length-1 && !inList; i++) {
      if ($scope.content.billList[i].item === name) {
        inList = true;
        $scope.content.billList.splice(i, 1);
      }
    }
     if (!inList) {
      alert("error in finding " + name + " in bill list");
    };
  };



  $rootScope.totalBill = function(){
    var total = 0;

    for (var i = 0 ; i <= $scope.content.billList.length-1; i++) {
      total = total + $scope.content.billList[i].expense;
    }

    return total;
  };

  $scope.$watch('dateEpoch', function() {3600
    if ($scope.dateEpoch - timeSincepaid >= 3600)
    {
      timeSincepaid = timeSincepaid + 3600;
      var Appliances = applianceTableController.getAppliances();
      for (var i = 0; i < Appliances.length; i++) {
        $rootScope.addbill(Appliances[i].name, priceService.getPriceNow($scope.dateEpoch,Appliances[i].energyConsumption));

      }
    }

  });


  }]);