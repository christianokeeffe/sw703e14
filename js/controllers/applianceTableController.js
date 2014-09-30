var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope','$modal','TaskService','appliancesFactory','formatRequest','lowPriceService', function($scope, $modal, TaskService, appliancesFactory, formatRequest, lowPriceService){

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

  $scope.getAppliances();

	$scope.open = function (selectedAction) {
    $scope.selectedAction = selectedAction;
    lowPriceService.setApplience(selectedAction);
    lowPriceService.setTableContent($scope.tableActionContent);
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
        lowPriceService.setApplience($scope.selectedAction);
        lowPriceService.setTask(returnValue.item);
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