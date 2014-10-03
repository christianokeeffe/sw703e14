var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope','$modal','appliancesFactory','formatRequest','controllerService', 'tasksFactory', function($scope, $modal, appliancesFactory, formatRequest, controllerService, tasksFactory){

	$scope.selected;
  $scope.selectedAction;
  $scope.test = "test";

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
        $scope.appliances = response.data;
      },
      function () {
        //alert(JSON.stringify(response));
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
        $scope.tableActionContent = response.data;
      },
      function () {
        //alert(JSON.stringify(response));
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getAppliances();
  $scope.getApplianceTask(2);

	$scope.open = function (selectedAction) {
    controllerService.setAppliance(selectedAction);
    controllerService.setTableContent($scope.tableActionContent);
    alert(JSON.stringify($scope.tableActionContent[0].name));
    var modalInstance = $modal.open({
      templateUrl: '/sw703e14/views/actionModal.html',
      controller: 'actionModalController',
      size: 'sm'
    });

    modalInstance.result.then(function (returnValue) {
      $scope.selected = returnValue.item;
      if (returnValue.mode == 'now') {
        $scope.$broadcast('module-communication', {username: returnValue.item.name});
      } else {
        controllerService.setAppliance($scope.selectedAction);
        controllerService.setTask(returnValue.item);
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
    });
  };
}]);