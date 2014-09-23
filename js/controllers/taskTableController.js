var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController', ['$scope','$modal','TaskService', function($scope, $modal, TaskService){

	$scope.tableActionContent = TaskService.list();

	$scope.selected;
  $scope.selectedAction;

	$scope.open = function (selectedAction) {
    $scope.selectedAction = selectedAction;
    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
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

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
      $scope.openLowPrice(selectedItem, $scope.selectedAction);
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

    modalInstance.result.then(function (selectedAction){
      $scope.selectedAction = selectedAction;
    });
  };
}]);

var actionModalController = function ($scope, $modalInstance, tableActionContent, selectedAction) {
	$scope.items = tableActionContent;
  	$scope.header = selectedAction;
  	$scope.selected = "Select an item";

  	$scope.clicked = function(selectedItem){
  		$scope.selected = selectedItem;
  	}

  	$scope.ok = function (selectedItem) {
    	$modalInstance.close(selectedItem);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
};

var lowPriceController = function($scope, $modalInstance, selectedItem, selectedAction){
  $scope.header = selectedAction;
  $scope.Hej = selectedItem;
  alert(selectedItem);
  alert(selectedAction);

  $scope.close = function () {
    $modalInstance.dismiss("Closed");
  };
};

