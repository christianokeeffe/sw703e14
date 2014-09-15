var myApp = angular.module('smartgridgame');

myApp.controller('priceTableController', ['$scope', function($scope){
	$scope.content = {
		"data": [
			{
				"price":"4",
				"name":"Wind"
			},
			{
				"price":"5",
				"name":"Sun"
			},
			{
				"price":"12",
				"name":"Coal"
			},
			{
				"price":"11",
				"name":"BIO"
			}

		]
	}

	$scope.tablePriceHeadA="Category";
	$scope.tablePriceHeadB="Price";

}]);