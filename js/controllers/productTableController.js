var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', '$rootScope', '$modal', 'controllerService', 'averageMarketPriceFactory', 'productsFactory', 'formatRequest', 'userproductsFactory', function($scope, $rootScope, $modal, controllerService, averageMarketPriceFactory, productsFactory, formatRequest, userproductsFactory){

	$rootScope.productArray = [];

	$scope.shownProduct = [];
	$scope.sortedByTypeArray = [];
	var boughtProducts = [];

	function ProductArray (type) {
		this.type = type;
		this.array = [];
	}

	function saveProduct (newProductID, oldProductID) {
		var params = {};
		var UserProduct = {};

		UserProduct.userID = $scope.getUserID();
		UserProduct.productID = newProductID;

		params.replaceID = oldProductID;
		params.user_product = UserProduct;

		var request = formatRequest.put(params);
		if(request === undefined)
		{
			setTimeout(function(){
			return saveProduct(newProductID, oldProductID);
			}, 10);
		}
		else
		{ 
			userproductsFactory.updateProduct(request,
			function (response) {
			//alert(JSON.stringify(response));
			},
			function (response) {
			document.write(JSON.stringify(response));
			});
		}
	}

	function addUserProduct (ProductID) {
		var params = {};
		var UserProduct = {};

		UserProduct.userID = $scope.getUserID();
		UserProduct.productID = ProductID;

		params.user_product = UserProduct;

		var request = formatRequest.put(params);
		if(request === undefined)
		{
			setTimeout(function(){
			return addUserProduct(ProductID);
			}, 10);
		}
		else
		{ 
			userproductsFactory.addUserProduct(request,
			function (response) {
			//alert(JSON.stringify(response));
			},
			function (response) {
			document.write(JSON.stringify(response));
			});
		}
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
					$rootScope.productArray.push(userProducts[0]);
					setFlag = true;
				} 
			}
			if(!setFlag){
				$scope.shownProduct.push({product: {id: 0, name: "-Not bought-", price: 0, type: $scope.sortedByTypeArray[i].type, watt: 0, description: ""}, hasUpgrade: tempHaveUpgrade});
				setFlag = true;
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
    	$rootScope.setBalance($rootScope.balance - boughtProduct.price);
    	if(!angular.isUndefined($rootScope.productArray)){
	    	for(var i = 0; i < $rootScope.productArray.length; i++){
	    		if($rootScope.productArray.type == boughtProduct.type){
	    			saveProduct($rootScope.productArray[i].id, boughtProduct.id);
	    			$rootScope.productArray.splice(i,1,boughtProduct);
	    			typeAlreadyInProductArray = true;
	    		}
    		}
		}
    	if(!typeAlreadyInProductArray){
    		$rootScope.productArray.push(boughtProduct);
    		addUserProduct(boughtProduct.id);
    	}

    	$rootScope.startGameTime();
    }, function (){
    	$rootScope.startGameTime();
    });
  };
}]);