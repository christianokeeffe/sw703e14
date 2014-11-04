var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var hour = 3600;
  var timeForLastpaid = 1409565600;
  var timeSincelastMonth = $rootScope.curDate().getMonth();

  $scope.content = {
    "runningAppliances": [
      {"name": "", "time": 0}
    ],
    "addedbills":[
      {"item": "",
       "expense": 0
      }
      ]
  }
  $rootScope.test = function(){
    var temp = 1;
    var Appliances = controllerService.getApplianceArray();
    $scope.addbill("item 42", Appliances[0].energyConsumption);
  };

  $scope.addbill = function(name, price){
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

  $scope.resetAddedBills = function(){
    $scope.content.addedbills = [{"item": "","expense": 0}];
  };

  $rootScope.totalBill = function(){
    var total = 0;

    for (var x = 0 ; x <= $scope.content.addedbills.length-1; x++) {
      total = total + $scope.content.addedbills[x].expense;
    }

    return total;
  };

  $scope.findTimeLeft = function(name, timesincepaid){
    var timeleft = 0;
    for (var x = 0 ; x <= $scope.content.runningAppliances.length-1 ; x++) {
      if ($scope.content.runningAppliances[x] == name) {
        timeleft = scope.content.runningAppliances[x].time;
        alert("timeleft: "+ timeleft);
        if (timeleft < timesincepaid) {
          $scope.removetask(x);
        }
        else{
          scope.content.runningAppliances[x].time = timeleft - timesincepaid;
        }
        return timeleft;

      }
    }
    return 0;
  }

  $scope.removetask = function(index){
    $scope.content.runningAppliances.splice(index, 1);
  }

  $scope.$on('bill-communication', function (event, data){
    $scope.content.runningAppliances.push({"name": data.name, "time": data.time});

  });

  $scope.$watch('dateEpoch', function() {
    alert(" lenght: " + $scope.content.runningAppliances.length);
    var tempDateEpoch = $scope.dateEpoch;
    var Appliances = controllerService.getApplianceArray();
    for (var x = 0; x < Appliances.length ; x++) {
      var name = Appliances[x].name;
      var timesincepaid = tempDateEpoch - timeForLastpaid;
      var timeleft = $scope.findTimeLeft(name, timesincepaid); // get the time left on a task
      var timeToPay = 0;

      if (Appliances[x].passive == 0) { // see if the Appliances that need to be activated
        timeToPay = timeleft;
      }
      else{ // if the Appliances is always running
        timeToPay = timesincepaid;
      }
      var price = priceService.getTotalPrice(timeForLastpaid, timeToPay,  Appliances[x].energyConsumption);
      if(angular.isUndefined(price) || price === null){
        price = 0 ;
      }   
      $scope.addbill(name, price);
    }
    timeForLastpaid = tempDateEpoch;

    if (timeSincelastMonth < $rootScope.curDate().getMonth()) {
      $scope.resetAddedBills();
      timeSincelastMonth = $rootScope.curDate().getMonth();
    };

  });
  }]);