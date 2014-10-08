var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope', '$rootScope', '$modal','appliancesFactory','formatRequest','controllerService', 'tasksFactory', function($scope, $rootScope, $modal, appliancesFactory, formatRequest, controllerService, tasksFactory){

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
        controllerService.setAllowed(false);
        controllerService.setTableContent(response.data);
        controllerService.setAllowed(true);
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getAppliances();

  $scope.openActionModal = function (selectedAction) {
    $rootScope.TOcounter = 0;
    $scope.getApplianceTask(selectedAction.id);

    if (controllerService.isAllowed() && (controllerService.getTableContent().length > 0)) {
      $scope.TOcounter = 0; 
      $scope.open(selectedAction.name);
    } else if($scope.TOcounter < 10){
      setTimeout(function(){
        $scope.TOcounter++;
        console.log($scope.TOcounter);
        return $scope.openActionModal(selectedAction);
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
      templateUrl: '/sw703e14/views/actionModal.html',
      controller: 'actionModalController',
      size: 'sm'
    });

    modalInstance.result.then(function (returnValue) {
      if (returnValue == 'now') {
        $rootScope.startGameTime();
        $scope.$broadcast('module-communication', {username: controllerService.getTask().name, runTime: controllerService.getTask().executionTime});
      } else {
        $scope.openLowPrice();
      };
    });
  };

  $scope.openLowPrice = function() {
    var modalInstance = $modal.open({
      templateUrl: '/sw703e14/views/lowPriceModal.html',
      controller: 'lowPriceController',
      size: ""
    });

    modalInstance.result.then(function (beforeTime){
      alert(beforeTime);
      $rootScope.startGameTime();
    });
  };
}]);