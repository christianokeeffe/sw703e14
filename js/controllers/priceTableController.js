var myApp = angular.module('smartgridgame');

myApp.controller('priceTableController', ['$scope', '$translate', function($scope, $translate){

	$scope.content = {
		"data": [
			{
				"price" : "5",
				"name": "wind"
			},
			{
				"price":"4",
				"name":"sun"
			},
			{
				"price":"12",
				"name":"coal"
			},
			{
				"price":"11",
				"name":"bio"
			}
		]
	};
	
	// Translate the names for the energy sources
	$translate('textToPriceTable.wind').then(function (translations){
		$scope.content.data[0].name = translations;
	});

	$translate('textToPriceTable.sun').then(function (translations){
		$scope.content.data[1].name = translations;
	});

	$translate('textToPriceTable.coal').then(function (translations){
		$scope.content.data[2].name = translations;
	});

	$translate('textToPriceTable.bio').then(function (translations){
		$scope.content.data[3].name = translations;
	});
	// End for translating

	$scope.findLowestPrice = function(){
		var HighestPrice = Number.MAX_VALUE;
		for (var i = 0 ; i <= $scope.content.data.length-1; i++) {
			if (parseInt($scope.content.data[i].price) < HighestPrice) {
				HighestPrice = $scope.content.data[i].price;
			};
		}
		return HighestPrice;
	};
}]);