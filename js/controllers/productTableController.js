var myApp = angular.module('smartgridgame');

myApp.controller('productTableController',['$scope', '$rootScope', '$modal', 'controllerService', 'averageMarketPriceFactory', 'formatRequest', function($scope, $rootScope, $modal, controllerService, averageMarketPriceFactory, formatRequest){
	$scope.productArray = [{id: 1, name: "Small Solarpanel", brought: true, saveFactor: 15, cost: 50000, description: "Solarpanel generates electricisy by being exposed to solar radiance."},
						{id: 2, name: "Big solarpanel", brought: false, saveFactor: 25, cost: 1000000, description: "Geothermal energy works by exstracting heat from the ground and by pressure difference transfer the heat energy to water which the household then can use."},
						{id: 3, name: "Micro CHP", brought: false, saveFactor: 27.9, cost: 102000, description: "A micro CHP is a small powerplant in a household which both provides heat as well as electricity."}];

	$scope.estimateOfPowerUsage = 0;

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

	calculateEstimatePowerUsage = function(){
		var appliances = controllerService.getApplianceArray();
		//Calculates the total number of each category to be done

		var dishesOnAMonth = 1.042*24*30;
		var landryOnAMonth = 0.198*24*30;
		var hygineOnAMonth = 0.298*24*30;
		
		for(var i = 0; i < appliances.length; i++){
			var tempApp = appliances[i];
			var tempTask = controllerService.getTasksByID(tempApp.id);

			switch(tempApp.type){
				case "1":
					calculateHelpterFunction(tempApp.energyConsumption, tempTask, 12);
					break;
				case "2":
					//car
					break;
				case "3":
				case "4":
					calculateHelpterFunction(tempApp.energyConsumption, tempTask, landryOnAMonth/2);
					break;
				case "5":
					//baker
					break;
				case "6":
					calculateHelpterFunction(tempApp.energyConsumption, tempTask, dishesOnAMonth);
					break;
				case "7":
					calculateHelpterFunction(tempApp.energyConsumption, tempTask, hygineOnAMonth);
					break;
				case "8":
					//do landry in hand
					break;
			}

		};
	};

	var NumberOfApplianceRuns = function(needsOnAMount, updateValue){
		return needsOnAMount / parseInt(updateValue);
	}

	var calculateHelpterFunction = function(energyConsume, executionTask, needsOnAMonth){
		if(executionTask != null) {
			var task = executionTask[0];
			var result = parseFloat(energyConsume)*(parseInt(task.executionTime) / 3600)* NumberOfApplianceRuns(needsOnAMonth, task.updateValue);
			$scope.estimateOfPowerUsage += result;
		} else {
			//case if a appliance have no tasks e.g. a fridge
			//assumtion that the given application is on 12 hours a day
			$scope.estimateOfPowerUsage += parseFloat(energyConsume)*(needsOnAMonth*30);
		}
	};

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
      	powerUsage: function (){
      		return $scope.estimateOfPowerUsage;
      	},
      	powerCost: function (){
      		return $scope.Average;
      	}
      }
    });

    modalInstance.result.then(function (broughtProduct) {

    	var index = $scope.productArray.indexOf(broughtProduct);
    	$rootScope.balance = $rootScope.balance - broughtProduct.cost;
    	$scope.productArray[index].brought = true;
    	$rootScope.startGameTime();
    }, function (){
    	$rootScope.startGameTime();
    });
  };
}]);