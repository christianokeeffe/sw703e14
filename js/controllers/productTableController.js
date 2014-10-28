var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', '$rootScope', '$modal', function($scope, $rootScope, $modal){
	$scope.productArray = [{id: 1, name: "Solarpanel", brought: true, category: "el", saveFactor: 50, cost: 50000, description: "Solarpanel generates electricisy by being exposed to solar radiance."},
						{id: 2, name: "Geothermal Energy", brought: false, category: "varme", saveFactor: 80, cost: 1000000, description: "Geothermal energy works by exstracting heat from the ground and by pressure difference transfer the heat energy to water which the household then can use."},
						{id: 3, name: "Micro CHP", brought: false, category: "varme", saveFactor: 25, cost: 2000000, description: "A micro CHP is a small powerplant in a household which both provides heat as well as electricity."}];

	$scope.openProductModal = function (selectedProduct) {
    $rootScope.stopGameTime();

    var modalInstance = $modal.open({
      templateUrl: 'views/productModalView.html',
      controller: 'productModalController',
      size: 'sm',
      resolve: {
      	selectedProduct: function (){
      		return selectedProduct;
      	}
      }
    });

    modalInstance.result.then(function (returnValue) {

    });
  };
}]);