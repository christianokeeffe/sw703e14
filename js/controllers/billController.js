var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var month = 3600
  var timeSincepaid = 1409565600 + month;
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
    $rootScope.addbill("item 42", 20);
  };

  $rootScope.addbill = function(name, price){
    alert("name: " + name + " price: " + price);
    var inList = false;
    for (var i = 0; i < $scope.content.addedbills.length && !inList; i++) {
      if ($scope.content.addedbills[i].item === name) {
        inList = true;
        $scope.content.addedbills[i].expense += price;
      }
    }
    if (!inList) {
      $scope.content.addedbills.push({"item": name , "expense": price})
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

  $scope.$watch('dateEpoch', function() {
    var tempDateEpoch = $scope.dateEpoch;
    if (tempDateEpoch - timeSincepaid >= month)
    {
      timeSincepaid = timeSincepaid + month;
      var Appliances = controllerService.getApplianceArray();
      for (var x = 0; x < Appliances.length ; x++) {
        var name = Appliances[x].name;
        var price =  priceService.getPriceNow(tempDateEpoch, Appliances[x].energyConsumption);
        alert("app" + x + " name:"+ name + " price: " + price);
        $rootScope.addbill(name, price);
      }
    }
  });
  }]);