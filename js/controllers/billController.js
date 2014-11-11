var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var hour = 3600;
  var timeForLastpaid = $scope.dateEpoch;
  var lastMonth;
  var passiveAppliances = [];
  var runningAppliances = [];
  var payLastMonth = 0;
  $rootScope.billPassiveHelper = 0;
  $scope.content = {
    "addedbills":[
      {"item": "",
       "expense": 0
      }
      ]
  }

  $scope.getAppliances = function(){
    passiveAppliances = [];
    var temp = controllerService.getApplianceArray();
    if(angular.isUndefined(temp) || temp === null){
          temp = [];
    }
    for (var i = 0; i < temp.length; i++) {
      if(temp[i].passive == "1"){
        passiveAppliances.push(temp[i]);
      }
    }
    temp = null;
  };

  $scope.getPayLastMonth = function(){
    return payLastMonth;
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

  $scope.removetask = function(index){
    runningAppliances.splice(index, 1);
  }

  $scope.$on('bill-communication', function (event, data){
    //console.log("test 1");
    runningAppliances.push({"name": data.name, "time": data.time , "energyConsumption": data.energyConsumption});

  });
  $scope.$watch('dateEpoch', function() {
    if(angular.isUndefined(lastMonth) || lastMonth === null|| isNaN(lastMonth)){
      lastMonth = null;
      lastMonth = $rootScope.curDate().getMonth();
    }
    if ($rootScope.billPassiveHelper == 0) {
      $scope.getAppliances();
    }
    if (passiveAppliances.length > 0) {
      $rootScope.billPassiveHelper = 1;
    }
    for (var x = 0; x < passiveAppliances.length ; x++) {
      var price = priceService.getTotalPrice(timeForLastpaid, $rootScope.gameSecOnRealSec,  passiveAppliances[x].energyConsumption);
      if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
        price = 0 ;
      }   
      $scope.addbill(passiveAppliances[x].name, -price);
    }
    for (var x = 0; x < $rootScope.productArray.length ; x++) {
      if($rootScope.productArray[x].bought)
      {
        var price = priceService.getTotalSolarPrice(timeForLastpaid, $rootScope.gameSecOnRealSec, $rootScope.productArray[x].watt);
        if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
          price = 0 ;
        }   
        $scope.addbill($rootScope.productArray[x].name, price);
      }
    }
    for (var i = 0; i < runningAppliances.length; i++) { // if the running time is shorter then gameSecOnRealSec
      if (runningAppliances[i].time < $rootScope.gameSecOnRealSec) {
        var price = priceService.getTotalPrice(timeForLastpaid, runningAppliances[i].time,  runningAppliances[i].energyConsumption);
        if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
          price = 0 ;
        }   
        $scope.addbill(runningAppliances[i].name, -price);
        $scope.removetask(i);
      }
      else{ // if the running time is longer then gameSecOnRealSec
        runningAppliances[i].time = runningAppliances[i].time - $rootScope.gameSecOnRealSec
        var price = priceService.getTotalPrice(timeForLastpaid, $rootScope.gameSecOnRealSec,  runningAppliances[i].energyConsumption);

        if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
          price = 0 ;
        }
        $scope.addbill(runningAppliances[i].name, -price);

      }
    };
    timeForLastpaid = $scope.dateEpoch;
    if (lastMonth != $rootScope.curDate().getMonth()) { // probem if time is more then a month
      $rootScope.balance += $rootScope.totalBill();
      payLastMonth = $rootScope.totalBill();
      $scope.resetAddedBills();
      lastMonth = $rootScope.curDate().getMonth();
    }
  });
}]);