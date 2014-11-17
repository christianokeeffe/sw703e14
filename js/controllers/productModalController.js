var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', 'arrayOfProducts', 'powerCost', 'balance', function($scope, $modalInstance, selectedProduct, arrayOfProducts, powerCost, balance){
	$scope.product = selectedProduct;
	$scope.showAlert = false;
	$scope.productsProduction = Math.ceil(parseInt($scope.product.watt)*parseFloat(powerCost)/100)*100;
	
	var price = parseInt($scope.product.price);

	if(balance > price)
	{
		$scope.btnClass = 'btn-success';
	} else {
		$scope.btnClass = 'btn-danger';
	}

	$scope.buy = function(){
		if(balance > price){
			$modalInstance.close(selectedProduct);
		} else {
			$scope.showAlert = true;
		}
	}

	$scope.cancel = function(){
		$modalInstance.dismiss("Closed");
	}
}]);