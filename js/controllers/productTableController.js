var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', '$rootScope', '$modal', 'controllerService', 'averageMarketPriceFactory', 'productsFactory', 'formatRequest', function($scope, $rootScope, $modal, controllerService, averageMarketPriceFactory, productsFactory, formatRequest){

	$rootScope.productArray = [];

	$scope.shownProduct = [];
	$scope.sortedByTypeArray = [];
	var broughtProducts = [];

	broughtProducts.push(0);
	broughtProducts.push(0);
	broughtProducts.push(0);

	function ProductArray (type) {
		this.type = type;
		this.array = [];
	}

	var findProducts = function()
	{
		for(var i = 0; i < $scope.sortedByTypeArray.length; i++){
			var tempHaveUpgrade = false;
			
			if($scope.sortedByTypeArray[i].length > 1){
				tempHaveUpgrade = true;
			}
			console.log(broughtProducts[i]);
			$scope.shownProduct.push({product: $scope.sortedByTypeArray[i].array[broughtProducts[i]], hasUpgrade: tempHaveUpgrade});
		}
		console.log($scope.shownProduct);
	}

	getProducts = function(){
		var flag = false;
		var geturl = formatRequest.get({});
	    if(geturl === undefined)
	    {
	      setTimeout(function(){
	        return getProducts();
	      }, 10);
	    }
	    else
	    {
	     	var productPromise = productsFactory.getAllProducts(geturl);
      		productPromise.$promise.then(function(response){
      			var oldType;
      			var index = 0;
      			for(var i = 0; i < response.data.length; i++){
      				var element = response.data[i];

      				if(element.type != oldType)
      				{
      					flag = false;
      				} 
     				else if(oldType != undefined){
     					$scope.sortedByTypeArray[index - 1].array.push(element);
     				}

      				if(!flag){
      					var tmp = new ProductArray(element.type);
      					tmp.array.push(element);
      					$scope.sortedByTypeArray.push(tmp);
      					flag = true;
      					oldType = element.type;
      					index++;
      				}
      			}

      			findProducts();
      		});
	    }
	}

	getProducts();

	$scope.openProductModal = function (selectedProduct, index) {
    $rootScope.stopGameTime();

    var modalInstance = $modal.open({
      templateUrl: 'views/productModalView.html',
      controller: 'productModalController',
      size: 'sm',
      resolve: {
      	selectedProduct: function (){
      		return selectedProduct;
      	},
      	arrayOfProducts: function (){
      		return $scope.sortedByTypeArray[index];
      	},
      	powerCost: function (){
      		return $scope.Average;
      	},
      	balance: function (){
      		return $rootScope.balance;
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