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

	
	$scope.findHighestPrice = function(){
		var HighestPrice = Number.MAX_VALUE;
		for (var i = 0 ; i <= $scope.content.data.length-1; i++) {
			if (parseInt($scope.content.data[i].price) < HighestPrice) {
				HighestPrice = $scope.content.data[i].price;
			};
		}
		return HighestPrice;
	};
	$scope.tablePriceHighestPrice = "";
	
	$scope.tablePriceHeadA="Category";
	$scope.tablePriceHeadB="Price";

}]);