var myApp = angular.module('smartgridgame');

myApp.controller('mainController', ['$scope','$interval','$rootScope','gamedataFactory', 'graphdataFactory', 'formatRequest','$location','$sessionStorage','priceService','$translate', function($scope,$interval,$rootScope,gamedataFactory,graphdataFactory,formatRequest,$location,$sessionStorage,priceService,$translate){

	$rootScope.gameSecOnRealSec = 900;
    $rootScope.speed = 4;
	var startDate = 1409565600;
	var secondsInWeek = 604800;
	$rootScope.balanceMove = 0;
	var gotPaidToday = false;

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
								//$rootScope.startGameTime();
					            $rootScope.lastEpochUpdate = parseInt(response.data.date);
					            $rootScope.dishes = parseFloat(response.data.dishes);
					            $rootScope.hygiene = parseFloat(response.data.hygiene);
					            $rootScope.cleanClothes = parseFloat(response.data.cleanClothes);
					            $rootScope.wetClothes = parseFloat(response.data.wetClothes);
					            $rootScope.carBattery = parseFloat(response.data.carBattery);
					            
					            $rootScope.billValue = parseFloat(response.data.billValue);
					            if($rootScope.billValue != 0)
			            		{
									$translate('billTable.lastsave').then(function (translations){$rootScope.addbill(translations,$rootScope.billValue);});
					            }

					            break;
					        case '204':
								//$rootScope.startGameTime();
					          	break;
					        }
	    		},
	    		function () {
	    			document.write(JSON.stringify(response));
	    		});
	    }
	}

    //LINQ like where clause for arrays. Usage: myArray.where({ id: 4 });
    //Source: http://stackoverflow.com/questions/18936774/javascript-equivalent-to-c-sharp-linq-select
    Array.prototype.where = function (filter) {
        switch(typeof filter) {
            case 'function':
                return $.grep(that, filter);

            case 'object':
                var filtered = this;
                for(var prop in filter) {
                    if(!filter.hasOwnProperty(prop)) {
                        continue; // ignore inherited properties
                    }
                    filtered = $.grep(filtered, function (item) {
                        return item[prop] === filter[prop];
                    });
                }
                return filtered.slice(0); // copy the array
            // (in case of empty object filter)

            default:
                throw new TypeError('func must be either a' +
                    'function or an object of properties and values to filter by');
        }
    };

	$rootScope.startGameTime = function() {
		if($rootScope.speed != 4)
		{
			//latex start maincontrollerIntervalStart
			interval = $interval(function(){
				$scope.dateEpoch += $scope.gameSecOnRealSec;
			},1000);
			//latex end
		}	
	}

	//latex start maincontrollerGivePay
	$scope.$watch('dateEpoch', function() {
		var pay = 1000;
		var currentDay = $rootScope.curDate().getDay();
		if(currentDay == 1 && !gotPaidToday && $rootScope.curDate().getHours() >= 7)
		{
            $rootScope.balance += pay - (pay/5 * $rootScope.timesMissedWork);
            $rootScope.timesMissedWork = 0;
			$scope.saveData();
			$scope.saveGraphData();
			gotPaidToday = true;
		}
		else if (currentDay == 2)
		{
			gotPaidToday = false;
		}
	});
	//latex end

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
		$rootScope.tabView = $sessionStorage.tabView;
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
		gamedata.billValue = $rootScope.totalBill();
		console.log(gamedata.billValue);
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
}]);