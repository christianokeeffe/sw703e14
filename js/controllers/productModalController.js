var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', function($scope, $modalInstance, selectedProduct, powerUsage){
	$scope.product = selectedProduct;
	$scope.calculatedResult = 0;
	$scope.times;

	$scope.calculatePreview = function()
	{
		$scope.calculatedResult = powerUsage*(100-$scope.product.saveFactor);
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