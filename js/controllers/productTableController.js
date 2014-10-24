var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', function($scope){
	$scope.productArray = [{id: 1, name: "solceller", category: "el", saveFactor: 50, cost: 50000},
						{id: 2, name: "jordvarme", category: "varme", saveFactor: 80, cost: 1000000},
						{id: 3, name: "mikro CHP", category: "varme", saveFactor: 25, cost: 2000000}];

	$scope.openProductModal = function (selectedAction) {
    $rootScope.stopGameTime();

    var modalInstance = $modal.open({
      templateUrl: 'views/actionModal.html',
      controller: 'actionModalController',
      size: 'sm'
    });

    modalInstance.result.then(function (returnValue) {
      
    });
  };
}]);