var myApp = angular.module('smartgridgame');

myApp.controller('productModalController',['$scope', '$modalInstance', 'selectedProduct', 'arrayOfProducts', 'powerCost', 'balance', function($scope, $modalInstance, selectedProduct, arrayOfProducts, powerCost, balance){
	$scope.product = selectedProduct;
	$scope.allProducts = arrayOfProducts.array;
	$scope.showAlert = false;
	$scope.productsProduction;

	var price = parseInt($scope.product.price);
	var index = 0;

	var calculateProduct = function(){
		$scope.productsProduction = Math.ceil(parseInt($scope.product.watt)*parseFloat(powerCost)/100)*100;
	}

	calculateProduct();

	var checkIfBuyAble = function(){
		if(balance > price)
		{
			$scope.btnClass = 'btn-success';
		} else {
			$scope.btnClass = 'btn-danger';
		}
	}

	checkIfBuyAble();

	$scope.update = function(item){
		$scope.product = item;
		index = $scope.allProducts.indexOf(item);
		price = parseInt($scope.product.price);
		checkIfBuyAble();

		calculateProduct();
	}

	$scope.buy = function(){
		if(balance > price){
			if($scope.product.id == 0){
				$modalInstance.dismiss("CLosed");
			}
			$modalInstance.close($scope.product);
		} else {
			$scope.showAlert = true;
		}
	}

	$scope.cancel = function(){
		$modalInstance.dismiss("Closed");
	}
}]);