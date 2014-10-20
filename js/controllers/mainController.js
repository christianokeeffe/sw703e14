var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval','$rootScope','gamedataFactory','formatRequest','$location','$sessionStorage', function($scope,$interval,$rootScope,gamedataFactory,formatRequest,$location,$sessionStorage){

	$scope.gameSecOnRealSec = 3600;
	$scope.dateEpoch = 1409565600;
	var timeSinceLastWeek = 1409565600;
	$scope.balance = 0;

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
	    	console.log("User ID: " + geturl.userID);
	    	gamedataFactory.loadGameData(geturl,
	    		function (response) {
					switch(response.status_code)
					        {
					          case '200':
					            $scope.score = parseInt(response.data.score);
					            $scope.balance = parseInt(response.data.savings);
					            $scope.dateEpoch = parseInt(response.data.date);
					            timeSinceLastWeek = parseInt(response.data.date);
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
			$scope.balance += 500;
			$scope.balance += $rootScope.totalBill();
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

    if($sessionStorage.currentUser === undefined)
    {
    	$location.path("/login");
	}
	else
	{
		$rootScope.currentUser = $sessionStorage.currentUser;
		$scope.loadData();
		$rootScope.startGameTime();
	}



	$scope.saveData = function()
	{
        var request = {};
		var gamedata = {};
		gamedata.userID = $scope.getUserID();
		gamedata.score = $rootScope.score;
		gamedata.savings = $scope.balance;
		gamedata.date = $scope.dateEpoch;

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
	    },
	    function (response) {
	        //alert(JSON.stringify(response));
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