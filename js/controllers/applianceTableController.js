var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope','$modal','TaskService','lowPriceService' , function($scope, $modal, TaskService, lowPriceService){
	$scope.tableActionContent = TaskService.list();

	$scope.selected;
  $scope.selectedAction;
  $scope.test = "test";

	$scope.open = function (selectedAction) {
    $scope.selectedAction = selectedAction;
    lowPriceService.setApplience(selectedAction);
    lowPriceService.setTableContent($scope.tableActionContent);
    var modalInstance = $modal.open({
      templateUrl: '../views/actionModal.html',
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
      templateUrl: '../views/lowPriceModal.html',
      controller: 'lowPriceController',
      size: ""
    });

    modalInstance.result.then(function (beforeTime){
      alert(beforeTime);
    });
  };
}]);