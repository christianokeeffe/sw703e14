var myApp = angular.module('smartgridgame');

myApp.controller('priceTableController', ['$scope', function($scope){
	$scope.tableCategoryContent=['Wind','Sun','Coal','BIO'];

	"data": [
		{
			"price":"2",
			"name":"wind"
		},
		{
			"price":"7",
			"name":"sun"
		}
	];

	$scope.tablePriceHeadA="Category";
	$scope.tablePriceHeadB="Price";

}]);