var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', 'powerCost', function($scope, $modalInstance, selectedProduct, powerCost){
	$scope.product = selectedProduct;

	$scope.powerCost = parseFloat(powerCost);
	$scope.productsProduction = Math.floor(parseInt($scope.product.watt)*$scope.powerCost);


	$scope.buy = function(){
		$modalInstance.close(selectedProduct);
	}

	$scope.cancel = function(){
		$modalInstance.dismiss("Closed");
	}
}]);