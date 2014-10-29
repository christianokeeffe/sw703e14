var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', function($scope, $modalInstance, selectedProduct){
	$scope.product = selectedProduct;
	$scope.calculatedResult;
	$scope.times = 1;

	$scope.calculatePreview = function()
	{
		$scope.calculatedResult = (500*$scope.times)*(100-$scope.product.saveFactor);
	}

	$scope.calculatePreview();

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