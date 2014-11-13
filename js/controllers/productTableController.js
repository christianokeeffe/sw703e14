var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', '$rootScope', '$modal', 'controllerService', 'averageMarketPriceFactory', 'productsFactory', 'formatRequest', function($scope, $rootScope, $modal, controllerService, averageMarketPriceFactory, productsFactory, formatRequest){

	$rootScope.productArray = {};

	getProducts = function(){
		var geturl = formatRequest.get({});
	    if(geturl === undefined)
	    {
	      setTimeout(function(){
	        return getProducts();
	      }, 10);
	    }
	    else
	    {
	      var productPromise = productsFactory.getProducts(geturl);
	      	productPromise.$promise.then(function(response){
	        	$rootScope.productArray = response.data;
	      });
	    }
	}

	getProducts();
	
	getAverage = function (){
    var geturl = formatRequest.get({});
	    if(geturl === undefined)
	    {
	      setTimeout(function(){
	        return getAverage();
	      }, 10);
	    }
	    else
	    {
	      var averagePromise = averageMarketPriceFactory.getAverageMarketPrice(geturl);
	      	averagePromise.$promise.then(function(response){
	        $scope.Average = response.data[0].average;
	      });
	    }
  	};

  	getAverage();

	$scope.$on('data-fetch-done', function (event){
		calculateEstimatePowerUsage();
	});

	$scope.openProductModal = function (selectedProduct) {
    $rootScope.stopGameTime();

    var modalInstance = $modal.open({
      templateUrl: 'views/productModalView.html',
      controller: 'productModalController',
      size: 'sm',
      resolve: {
      	selectedProduct: function (){
      		return selectedProduct;
      	},
      	powerCost: function (){
      		return $scope.Average;
      	}
      }
    });

    modalInstance.result.then(function (broughtProduct) {

    	var index = $rootScope.productArray.indexOf(selectedProduct);

    	$rootScope.balance = $rootScope.balance - broughtProduct.cost;
    	$rootScope.productArray[index].brought = true;
    	$rootScope.startGameTime();
    }, function (){
    	$rootScope.startGameTime();
    });
  };
}]);