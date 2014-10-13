var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope', '$rootScope', '$modal','appliancesFactory','formatRequest','controllerService', 'tasksFactory', function($scope, $rootScope, $modal, appliancesFactory, formatRequest, controllerService, tasksFactory){

  $scope.datesToSchedule = [];

  function boardCastActivation(name, run, val)
  {
    $scope.$broadcast('module-communication', {applianceName: name, runTime: run, updateValue: val});
  }

  $scope.SecondsToDate = function(input){
    var result = new Date(0);
    result.setUTCSeconds(input);
    return result;
  }

  var schedular = $scope.$watch('dateEpoch', function(){
    for(index = 0; index < $scope.datesToSchedule.length; index++)
    {
      var tempSchedule = $scope.datesToSchedule[index];

      if((tempSchedule.deadline - $scope.curDate().getTime()/1000) <= 0)
      {
        $scope.datesToSchedule.splice(index, 1);
        boardCastActivation(tempSchedule.applianceName, tempSchedule.runTime, tempSchedule.updateValue);
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
        console.log(JSON.stringify(response.data));
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
        boardCastActivation(controllerService.getAppliance().name, controllerService.getTask().executionTime, controllerService.getTask().updateValue);
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