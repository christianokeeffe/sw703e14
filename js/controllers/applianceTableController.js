var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope', '$rootScope', '$modal','appliancesFactory','formatRequest','controllerService', 'tasksFactory','priceService', function($scope, $rootScope, $modal, appliancesFactory, formatRequest, controllerService, tasksFactory,priceService){
  $scope.hasTasks = function(id) {
    return controllerService.checkApplianceHasTasks(id);
  };

  $scope.getAppliances = function()
  {
    var geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
      return $scope.getAppliances();
      }, 10);
    }
    else
    { 
      geturl.userID = $scope.getUserID();
      appliancesFactory.getAppliances(geturl,
      function (response) {
        $scope.appliances = response.data;
        controllerService.setApplianceArray($scope.appliances);
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getTasks = function (){
    var geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
        return $scope.getTasks();
      }, 10);
    }
    else
    {
      tasksFactory.getTasks(geturl,
      function (response) {
        controllerService.StoreAllTasks(response.data);
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getAppliances();
  $scope.getTasks();

	$scope.openActionModal = function (selectedAction) {
    $rootScope.stopGameTime();
    controllerService.setAppliance(selectedAction);
    var modalInstance = $modal.open({
      templateUrl: 'views/actionModal.html',
      controller: 'actionModalController',
      size: 'sm'
    });

    modalInstance.result.then(function (returnValue) {
      if (returnValue == 'now') {
        $rootScope.startGameTime();
        if($scope.checkIndexOnCompleteList(controllerService.getAppliance().name) == -1)
        {
          $scope.timersToSchedule.push({appliance: controllerService.getAppliance(), task: controllerService.getTask(), timerStarted: false})
          $scope.completeScheduleList.push({appliance: controllerService.getAppliance(), task: controllerService.getTask(), timerStarted: false});
        } else {
          alert("The chosen appliance is already in use!")
        };
      } else {
        if($scope.checkIndexOnCompleteList(controllerService.getAppliance().name) == -1) {
          $scope.openLowPrice();
        } else {
          alert("The chosen appliance is already in use!");
          $rootScope.startGameTime();
        };
      };
    }, function () {
        $rootScope.startGameTime();
    });
  };

  var addToScheduleList = function(scheduleObject)
  {
    var bestTime = priceService.getCheapestStarttime($scope.dateEpoch,scheduleObject.deadline,scheduleObject.task.executionTime);
    if(bestTime === undefined)
    {
      setTimeout(function(){
            return addToScheduleList(scheduleObject);
          }, 10);
    }
    else
    {
      scheduleObject.starttime = bestTime;
      $scope.datesToSchedule.push(scheduleObject);
       $scope.completeScheduleList.push(scheduleObject);
    }
  }

  $scope.openLowPrice = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/lowPriceModal.html',
      controller: 'lowPriceController',
      size: ""
    });

    modalInstance.result.then(function (schedule){
      $rootScope.startGameTime();
      addToScheduleList(schedule);
    }, function () {
        $rootScope.startGameTime();
    });
  };

    $scope.openUpgradeModal = function(selectedAction) {
        $rootScope.stopGameTime();
        controllerService.setAppliance(selectedAction);
        var modalInstance = $modal.open({
            templateUrl: 'views/upgradeModal.html',
            controller: 'upgradeModalController',
            size: ""
        });


        modalInstance.result.then(function (selectedUpgrade){
            $scope.appliances = controllerService.getApplianceArray();
            $rootScope.setBalance($rootScope.balance - selectedUpgrade.price);
            $rootScope.startGameTime();
        }, function () {
            $rootScope.startGameTime();
        });

    };
}]);