var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope','$modal','TaskService', function($scope, $modal, TaskService){

	$scope.tableActionContent = TaskService.list();

	$scope.selected;
  $scope.selectedAction;

	$scope.open = function (selectedAction) {
    $scope.selectedAction = selectedAction;
    var modalInstance = $modal.open({
      templateUrl: 'actionModal.html',
      controller: 'actionModalController',
      size: 'sm',
      resolve: {
        tableActionContent: function () {
          return $scope.tableActionContent;
        },
        selectedAction: function(){
        	return selectedAction;
        }
      }
    });

    modalInstance.result.then(function (returnValue) {
      $scope.selected = returnValue.item;
      if (returnValue.mode == 'now') {
        $scope.$broadcast('module-communication', {username: returnValue.item.name});
      } else {
        $scope.openLowPrice(returnValue.item, $scope.selectedAction);
      };
    });
  };

  $scope.openLowPrice = function(selectedItem, selectedAction) {
    var modalInstance = $modal.open({
      templateUrl: 'lowPriceModal.html',
      controller: 'lowPriceController',
      size: "",
      resolve: {
        selectedAction: function() {
          return selectedAction;
        },
        selectedItem: function() {
          return selectedItem;
        }
      }
    });

    modalInstance.result.then(function (beforeTime){
      alert(beforeTime);
    });
  };
}]);