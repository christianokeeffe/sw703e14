var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController', ['$scope','$modal','TaskService', function($scope, $modal, TaskService){

	$scope.tableActionContent = TaskService.list();

	$scope.selected;

	$scope.open = function (selectedAction) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: actionModalController,
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
    });
  };

}]);

var actionModalController = function ($scope, $modalInstance, tableActionContent, selectedAction) {
	$scope.items = tableActionContent;
  	$scope.header = selectedAction;
    $scope.stringClose = "Close";
  	$scope.selected = "Select an item";

  	$scope.clicked = function(selectedItem){
  		$scope.selected = selectedItem;
  	}

  	$scope.ok = function () {
    	$modalInstance.close($scope.selected.item);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
};