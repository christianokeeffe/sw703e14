var myApp = angular.module('smartgridgame');

myApp.controller('billController', ['$scope','$rootScope', 'priceService' , 'controllerService', function($scope,$rootScope, priceService, controllerService){
  var hour = 3600;
  var timeForLastpaid = $scope.dateEpoch;
  var timeSincelastMonth = $rootScope.curDate().getMonth();
  var passiveAppliances = [];
  var first = true;
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

  $scope.getAppliances = function(){
    //passiveAppliances = [];
    var temp = controllerService.getApplianceArray();
    console.log(JSON.stringify(temp));
    for (var i = 0; i < temp.length; i++) {
      if(temp[i].passive == "1"){
        passiveAppliances.push(temp[i]);
      }
    }
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
    if (first) {
      $scope.getAppliances();
      first = false;
    };
    var tempDateEpoch = $scope.dateEpoch;
    var timesincepaid = tempDateEpoch - timeForLastpaid;
    for (var x = 0; x < passiveAppliances.length ; x++) {
      var price = priceService.getTotalPrice(timeForLastpaid, timesincepaid,  passiveAppliances[x].energyConsumption);
      if(angular.isUndefined(price) || price === null){
        price = 0 ;
      }   
      $scope.addbill(passiveAppliances[x].name, price);
    }
    timeForLastpaid = tempDateEpoch;
    if (timeSincelastMonth < $rootScope.curDate().getMonth()) {
      $scope.resetAddedBills();
      timeSincelastMonth = $rootScope.curDate().getMonth();
    };

  });
  }]);