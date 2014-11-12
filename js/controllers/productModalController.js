var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', 'powerUsage', 'powerCost', function($scope, $modalInstance, selectedProduct, powerUsage, powerCost){
	$scope.product = selectedProduct;
	$scope.calculatedResult = 0;
	$scope.times;

	$scope.powerUsage = parseInt(powerUsage);
	$scope.powerCost = parseFloat(powerCost);
	$scope.productsProductionPerMonth = parseInt($scope.product.watt) / 12;

	$scope.calculatePreview = function()
	{
		var result1 = $scope.powerUsage*$scope.times*$scope.powerCost;
		console.log(result1);
		var result2 = $scope.productsProductionPerMonth*$scope.times*$scope.powerCost;
		console.log(result2);
		$scope.calculatedResult = Math.floor(result1 - result2);
	}

	$scope.preformCheck = function(time){
		if(time == undefined){
			$scope.times = 0;
		} else {
			$scope.times = time;
		}
		$scope.calculatePreview();
	}

	$scope.buy = function(){
		$modalInstance.close(selectedProduct);
	}

	$scope.cancel = function(){
		$modalInstance.dismiss("Closed");
	}
}]);