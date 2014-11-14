var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', 'powerCost','$translate', function($scope, $modalInstance, selectedProduct, powerCost, $translate){
	$scope.product = selectedProduct;

	$scope.powerCost = parseFloat(powerCost);
	$scope.productsProduction = Math.ceil(parseInt($scope.product.watt)*$scope.powerCost/100)*100;


	$scope.buy = function(){
		$modalInstance.close(selectedProduct);
	}

	$scope.cancel = function(){
		$modalInstance.dismiss("Closed");
	}
}]);