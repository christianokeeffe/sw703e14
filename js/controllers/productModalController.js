var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', 'powerUsage', 'powerCost', function($scope, $modalInstance, selectedProduct, powerUsage, powerCost){
	$scope.product = selectedProduct;
	$scope.calculatedResult = 0;
	$scope.times;

	$scope.powerUsage = powerUsage;
	$scope.powerCost = parseFloat(powerCost);
	$scope.productsProductionPerMonth = 1200 / 12;

	$scope.calculatePreview = function()
	{
		$scope.calculatedResult = Math.floor(($scope.powerUsage*$scope.times*$scope.powerCost - $scope.productsProductionPerMonth*$scope.times*$scope.powerCost));
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