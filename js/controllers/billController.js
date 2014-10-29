var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var hour = 3600;
  var timeSincepaid = 1409565600;
  var timeSincelastMonth = $rootScope.curDate().getMonth();

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
    "addedbills":[
      {"item": "item 1",
       "expense": 55
      }
      ]
  }
  $rootScope.test = function(){
    var temp = 1;
    var Appliances = controllerService.getApplianceArray();
    $rootScope.addbill("item 42", Appliances[0].energyConsumption);
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
      $scope.content.addedbills.push({"item": name , "expense": price})
    };
  };

  $rootScope.resetAddedBills = function(){
    $scope.content.addedbills = [{"item": "item 1","expense": 55}];
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

    for (var x = 0 ; x <= $scope.content.addedbills.length-1; x++) {
      total = total + $scope.content.addedbills[x].expense;
    }

    return total;
  };

  $scope.$watch('dateEpoch', function() {
    var tempDateEpoch = $scope.dateEpoch;
    var Appliances = controllerService.getApplianceArray();
    for (var x = 0; x < Appliances.length ; x++) {
      var name = Appliances[x].name;
      var timeleft = 3600; // get the time left on a task
      var timeToPay =0;

      if (true) { // see if the Appliances that need to be activated
        if (timeleft > tempDateEpoch - timeSincelastMonth) { // see if the time left more then what is needed to be calculated
        timeToPay = tempDateEpoch - timeSincelastMonth;
        }
        else{ 
          timeToPay = timeleft;
        }
      }
      else{ // if the Appliances is always running
        timeToPay = tempDateEpoch - timeSincelastMonth;
      }

      var price = priceService.getTotalPrice(timeSincepaid, timeToPay,  Appliances[x].energyConsumption);
        
      if(angular.isUndefined(price) || price === null){
        price = 0 ;
      }
      timeSincepaid = tempDateEpoch;   
      $rootScope.addbill(name, price);
    }

    if (timeSincelastMonth < $rootScope.curDate().getMonth()) {
      $rootScope.resetAddedBills();
      timeSincelastMonth = $rootScope.curDate().getMonth();
    };

  });
  }]);