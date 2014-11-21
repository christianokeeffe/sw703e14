var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', '$rootScope', '$modal', 'controllerService', 'averageMarketPriceFactory', 'productsFactory', 'formatRequest', function($scope, $rootScope, $modal, controllerService, averageMarketPriceFactory, productsFactory, formatRequest){

	$rootScope.productArray = [];

	$scope.shownProduct = [];
	$scope.sortedByTypeArray = [];
	var boughtProducts = [];

	function ProductArray (type) {
		this.type = type;
		this.array = [];
	}

	var sortProducts = function()
	{
		for(var i = 0; i < $scope.sortedByTypeArray.length; i++){
			var tempHaveUpgrade = true;
			var setFlag = false
			for(var j = 0; j < boughtProducts.length; j++){

				var userProducts = $scope.sortedByTypeArray[i].array.where({id: boughtProducts[j]});

				if(userProducts[0] != undefined && !setFlag){
					$scope.shownProduct.push({product: userProducts[0], hasUpgrade: tempHaveUpgrade});
					setFlag = true;
				} else if(!setFlag){
					$scope.shownProduct.push({product: {id: 0, name: "-Not bought-", price: 0, type: $scope.sortedByTypeArray[i].type, watt: 0, description: ""}, hasUpgrade: tempHaveUpgrade});
					setFlag = true;
				}
			}
		}
	}

	var getUserProducts = function(){
		var flag = false;
		var geturl = formatRequest.get({});
	    if(geturl === undefined)
	    {
	      setTimeout(function(){
	        return getUserProducts();
	      }, 10);
	    }
	    else
	    {
	    	geturl.userID = $scope.getUserID();
	    	var productPromise = productsFactory.getAllProducts(geturl);
	    	productPromise.$promise.then(function(response){
	    		boughtProducts = response.data;

	    		sortProducts();
	    	});
	    }
	}

	var getProducts = function(){
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
	    	geturl.userID = -1;
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

      			getUserProducts();
      		});
	    }
	}

	var temp = $scope.getUserID();

	if(temp != -1 && temp != undefined){
		getProducts();
	}

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

    modalInstance.result.then(function (boughtProduct) {
    	var typeAlreadyInProductArray = false;
    	$rootScope.balance = $rootScope.balance - parseInt(boughtProduct.cost);
    	for(var i = 0; i < $rootScope.productArray.length; i++){
    		if($rootScope.productArray.type == boughtProduct.type){
    			$rootScope.productArray.splice(i,1,boughtProduct);
    			typeAlreadyInProductArray = true;
    		}
    	}

    	if(!typeAlreadyInProductArray){
    		$rootScope.productArray.push(boughtProduct);
    	}

    	$rootScope.startGameTime();
    }, function (){
    	$rootScope.startGameTime();
    });
  };
}]);