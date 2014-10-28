var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval','$rootScope','gamedataFactory','formatRequest','$location','$sessionStorage','priceService', function($scope,$interval,$rootScope,gamedataFactory,formatRequest,$location,$sessionStorage,priceService){

	$scope.gameSecOnRealSec = 3600;
	$scope.dateEpoch = 1409565600;
	var timeSinceLastWeek = 1409565600;
	$rootScope.balance = 0;

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
					            timeSinceLastWeek = parseInt(response.data.date);
					            $rootScope.lastEpochUpdate = parseInt(response.data.date);
					            $rootScope.dishes = parseFloat(response.data.dishes);
					            $rootScope.hygiene = parseFloat(response.data.hygiene);
					            $rootScope.laundry = parseFloat(response.data.laundry);
					            break;
					        case '204':
					          	
					          break;
					        }
	    		},
	    		function () {
	    			document.write(JSON.stringify(response));
	    		});
	    }
	}


	$rootScope.startGameTime = function() {
		interval = $interval(function(){
		$scope.dateEpoch += $scope.gameSecOnRealSec;
		if($scope.dateEpoch - timeSinceLastWeek >= 604800)
		{
			timeSinceLastWeek = timeSinceLastWeek + 604800;
            $rootScope.balance += 500;
            $rootScope.balance += $rootScope.totalBill();
			$scope.saveData();
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
		$rootScope.startGameTime();
	}

    $rootScope.setBalance = function (balance)
    {
        $rootScope.balance = balance;
    }

	$scope.saveData = function()
	{
        var request = {};
		var gamedata = {};
		gamedata.userID = $scope.getUserID();
		gamedata.score = $rootScope.score;
		gamedata.savings = $rootScope.balance;
		gamedata.date = $scope.dateEpoch;
		gamedata.hygiene = $rootScope.hygiene;
		gamedata.dishes = $rootScope.dishes;
		gamedata.laundry = $rootScope.laundry;

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
	    //alert(JSON.stringify(response));
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

    window.onbeforeunload = function (event) {
        var message = 'Sure you want to leave?';
        $scope.saveData();
        if (typeof event == 'undefined') {
            event = window.event;
        }
        if (event) {
            event.returnValue = message;
        }
        return message;
    }
	
} ]);