var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var hour = 3600;
  var timeForLastpaid = undefined;
  var lastMonth;
  var passiveAppliances = [];
  var runningAppliances = [];
  var payLastMonth = 0;
  $rootScope.balanceMove = 0; 
  $rootScope.billPassiveHelper = 0;
  $scope.content = {
    "addedbills":[
      {"item": "",
       "expense": 0
      }
      ]
  }

  //latex start billgetAppliances
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
  //latex end

  $scope.getPayLastMonth = function(){
    return payLastMonth;
  };

  $rootScope.addbill = function(name, price){
    var inList = false;
    $rootScope.balanceMove += price;
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

    runningAppliances.push({"name": data.name, "time": data.time , "energyConsumption": data.energyConsumption});

  });
  $scope.$watch('dateEpoch', function() {
    if(angular.isUndefined(timeForLastpaid) || timeForLastpaid === null || isNaN(timeForLastpaid))
    {
      timeForLastpaid = $scope.dateEpoch;
    }
    if(!(angular.isUndefined(timeForLastpaid) || timeForLastpaid === null || isNaN(timeForLastpaid)))
    {
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
    //latex start passiveBill
    for (var x = 0; x < passiveAppliances.length ; x++) {
      var price = priceService.getTotalPrice(timeForLastpaid, $rootScope.gameSecOnRealSec,  passiveAppliances[x].energyConsumption);
      // a failsafe if the data for the prices is not loaded
      if(angular.isUndefined(price) || price === null){ 
        price = 0 ;
      }   
      $rootScope.addbill(passiveAppliances[x].name, -price);
    }
    var hasSolar = false;
    //latex end
    if(!angular.isUndefined($rootScope.productArray))
    {
      
      for (var x = 0; x < $rootScope.productArray.length ; x++) {
        if($rootScope.productArray[x].typeID == 9)
        {
          var price = priceService.getTotalSolarPrice(timeForLastpaid, $rootScope.gameSecOnRealSec, $rootScope.productArray[x].watt);
          if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
            price = 0 ;
          }
          hasSolar = true;
          $rootScope.solarUpdate(price.toFixed(2),timeForLastpaid);
          $rootScope.addbill($rootScope.productArray[x].name, price);
        }
      }
    }
    if(!hasSolar)
    {
      $rootScope.priceInSun = -$scope.dateEpoch;
    }
    for (var i = 0; i < runningAppliances.length; i++) { // if the running time is shorter then gameSecOnRealSec
      if (runningAppliances[i].time < $rootScope.gameSecOnRealSec) {
        var price = priceService.getTotalPrice(timeForLastpaid, runningAppliances[i].time,  runningAppliances[i].energyConsumption);
        if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
          price = 0 ;
        }   
        $rootScope.addbill(runningAppliances[i].name, -price);
        $scope.removetask(i);
      }
      else{ // if the running time is longer then gameSecOnRealSec
        runningAppliances[i].time = runningAppliances[i].time - $rootScope.gameSecOnRealSec
        var price = priceService.getTotalPrice(timeForLastpaid, $rootScope.gameSecOnRealSec,  runningAppliances[i].energyConsumption);

        if(angular.isUndefined(price) || price === null){ // a failsafe if the data for the prices is not loaded
          price = 0 ;
        }
        $rootScope.addbill(runningAppliances[i].name, -price);

      }
    };
    timeForLastpaid = $scope.dateEpoch;
    //latex start billMonth
    if (lastMonth != $rootScope.curDate().getMonth()) {
      $rootScope.balance += $rootScope.totalBill();
      payLastMonth = $rootScope.totalBill();
      $scope.resetAddedBills();
      lastMonth = $rootScope.curDate().getMonth();
    }
    //latex end
  }
  });
}]);