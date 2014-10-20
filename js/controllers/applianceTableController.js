var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope', '$rootScope', '$modal','appliancesFactory','formatRequest','controllerService', 'tasksFactory', function($scope, $rootScope, $modal, appliancesFactory, formatRequest, controllerService, tasksFactory){

  $rootScope.datesToSchedule = [];
  $rootScope.timersToSchedule = [];

  function boardCastActivation(task, inputType)
  {
    $scope.$broadcast('module-communication', {task: task, type: inputType});
  }

  $scope.SecondsToDate = function(input){
    var result = new Date(0);
    result.setUTCSeconds(input);
    return result;
  }

  var schedular = $scope.$watch('dateEpoch', function(){

    for(i = 0; i < $scope.timersToSchedule.length; i++) 
    {
      var tempTimer = $scope.timersToSchedule[i];

      if(tempTimer.timerStarted == false)
      {
        boardCastActivation(tempTimer.task, tempTimer.applianceType);
        $scope.timersToSchedule[i].timerStarted = true;
      }
    }

    for(index = 0; index < $scope.datesToSchedule.length; index++)
    {
      var tempSchedule = $scope.datesToSchedule[index];

      if((tempSchedule.deadline - $scope.curDate().getTime()/1000) <= 0)
      {
        $scope.timersToSchedule.push({applianceType: tempSchedule.appliance.type, task: tempSchedule.task, timerStarted: false});
        $scope.datesToSchedule.splice(index, 1);
      }
    }
  });

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
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getApplianceTask = function (id){
    var geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
        return $scope.getApplianceTask(id);
      }, 10);
    }
    else
    {
      geturl.id = id;
      tasksFactory.getTasks(geturl,
      function (response) {
        controllerService.setTableContent(response.data);
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getAppliances();

  $scope.preOpen = function (selectedAction){
    controllerService.setAllowed(false);
    $scope.getApplianceTask(selectedAction.id);
    openActionModal(selectedAction);
  }

  openActionModal = function (selectedAction) {
    $rootScope.TOcounter = 0;

    if (controllerService.isAllowed() && (controllerService.getTableContent().length > 0)) {
      $scope.TOcounter = 0; 
      $scope.open(selectedAction);
    } else if($scope.TOcounter < 10){
      setTimeout(function(){
        $scope.TOcounter++;
        return openActionModal(selectedAction);
      }, 100);
    } else {
      alert("selected appliance have no tasks");
      $scope.TOcounter = 0;
    }
  }

	$scope.open = function (selectedAction) {
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
        $scope.timersToSchedule.push({applianceType: controllerService.getAppliance().type, task: controllerService.getTask(), timerStarted: false})
      } else {
        $scope.openLowPrice();
      };
    });
  };

  $scope.openLowPrice = function() {
    var modalInstance = $modal.open({
      templateUrl: 'views/lowPriceModal.html',
      controller: 'lowPriceController',
      size: ""
    });

    modalInstance.result.then(function (schedule){
      $rootScope.startGameTime();
      $scope.datesToSchedule.push(schedule);
    });
  };
}]);