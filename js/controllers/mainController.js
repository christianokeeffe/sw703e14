var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval','$rootScope','gamedataFactory', 'graphdataFactory', 'formatRequest','$location','$sessionStorage','priceService', function($scope,$interval,$rootScope,gamedataFactory,graphdataFactory,formatRequest,$location,$sessionStorage,priceService){

	$rootScope.gameSecOnRealSec = 3600;
	var startDate = 1409565600;
	var secondsInWeek = 604800;

	$scope.loadData = function()
	{
		var geturl = formatRequest.get({});

	    if(geturl === undefined)
	    {
	      setTimeout(function(){
	          return $scope.loadData();
	         }, 10);
	    }
	    else
	    {
	    	geturl.userID = $scope.getUserID();
	    	gamedataFactory.loadGameData(geturl,
	    		function (response) {
					switch(response.status_code)
					        {
					          case '200':
					            $rootScope.score = parseInt(response.data.score);
                                $rootScope.balance = parseInt(response.data.savings);
					            $scope.dateEpoch = parseInt(response.data.date);
								$rootScope.startGameTime();
					            $rootScope.lastEpochUpdate = parseInt(response.data.date);
					            $rootScope.dishes = parseFloat(response.data.dishes);
					            $rootScope.hygiene = parseFloat(response.data.hygiene);
					            $rootScope.cleanClothes = parseFloat(response.data.cleanClothes);
					            $rootScope.wetClothes = parseFloat(response.data.wetClothes);
					            $rootScope.carBattery = parseFloat(response.data.carBattery);
					            break;
					        case '204':
								$rootScope.startGameTime();
					          	break;
					        }
	    		},
	    		function () {
	    			document.write(JSON.stringify(response));
	    		});
	    }
	}


	$rootScope.startGameTime = function() {
		var pay = 1000;
		interval = $interval(function(){
		$scope.dateEpoch += $scope.gameSecOnRealSec;
		if(($scope.dateEpoch - startDate)%secondsInWeek == 0)
		{
            $rootScope.balance += pay - (pay/5 * $rootScope.timesMissedWork);
            $rootScope.timesMissedWork = 0;
			$scope.saveData();
			$scope.saveGraphData();
		}
		},1000);
	}

	$rootScope.stopGameTime = function() {
		$interval.cancel(interval);
	}

	$scope.getUserID = function ()
	{
		if($scope.validUser())
		{
			return $rootScope.currentUser.id;
		}
		else
		{
			return -1;
		}
	}

	$scope.validUser = function ()
	{
		return $rootScope.currentUser !== undefined;
	}

    if($sessionStorage.currentUser === undefined || $sessionStorage.currentUser == "undefined")
    {
    	$location.path("/login");
	}
	else
	{
		$rootScope.currentUser = $sessionStorage.currentUser;
		$scope.loadData();
	}

    $rootScope.setBalance = function (balance)
    {
        $rootScope.balance = balance;
    }

    $scope.saveGraphData = function()
    {
    	var request = {};
    	var graphdata = {};
    	graphdata.userID = $scope.getUserID();
		graphdata.score = $rootScope.score;
		graphdata.date = $scope.dateEpoch;

		request.graph = graphdata;
		var params = formatRequest.put(request);
	  if(params === undefined)
	  {
	    setTimeout(function(){
	          return $scope.saveGraphData();
	       }, 10);
	  }
	  else
	  { 
	    graphdataFactory.saveGraphData(params,
	    function (response) {
	    //alert(JSON.stringify(response));
		},
	    function (response) {
	        document.write(JSON.stringify(response));
	    });
	  }
    };

    $rootScope.saveData = function()
	{
        var request = {};
		var gamedata = {};
		gamedata.userID = $scope.getUserID();
		gamedata.score = $rootScope.score;
		gamedata.savings = $rootScope.balance;
		gamedata.date = $scope.dateEpoch;
		gamedata.hygiene = $rootScope.hygiene;
		gamedata.dishes = $rootScope.dishes;
		gamedata.cleanClothes = $rootScope.cleanClothes;
		gamedata.wetClothes = $rootScope.wetClothes;
		gamedata.carBattery = $rootScope.carBattery;

        request.game = gamedata;

	  var params = formatRequest.put(request);
	  if(params === undefined)
	  {
	    setTimeout(function(){
	          return $scope.saveData();
	       }, 10);
	  }
	  else
	  { 
	    gamedataFactory.saveGameData(params,
	    function (response) {
            console.log("Saved!");
		},
	    function (response) {
	        
	        document.write(JSON.stringify(response));
	    });
	  }
	};

	$rootScope.curDate = function(){
		var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
		d.setUTCSeconds($scope.dateEpoch);
		return d;
	}
} ]);