var myApp = angular.module('smartgridgame');

myApp.controller('statusController', ['$scope','$rootScope', function($scope, $rootScope){
	$rootScope.dishes = 100;
	$rootScope.lastEpochUpdate = $scope.dateEpoch;
	$rootScope.hygiene = 100;
	$rootScope.cleanClothes = 100;
	$rootScope.wetClothes = 0.1;
    $rootScope.carBattery = 100;
	$rootScope.score = 0;
    $scope.carBatCount = 0;
    $scope.onWork = false;
    $rootScope.lastSave = 0;
    var balanceFactor = 5;

	var statusBarFloorValue = 0.1;

	function hourToPercentDrop(fullPercentDropInDays,numbOfHours)
	{
		var returnval = (numbOfHours/(fullPercentDropInDays*24))*100;
		return returnval;
	}

	$scope.$on('status-communication', function (event, data)
	{
		var value = parseInt(data.value);
		switch(data.category)
		{
			case "dishes":
				if($rootScope.dishes + value > 100)
				{
					$rootScope.dishes = 100;
				}
				else
				{
					$rootScope.dishes += value;
				}
				break;
			case "hygiene":
				if($rootScope.hygiene + value > 100)
				{
					$rootScope.hygiene = 100;
				} 
				else
				{
					$rootScope.hygiene += value;
				}
				break;
			case "laundry":
				if(100 - $rootScope.cleanClothes - $rootScope.wetClothes < value)
				{
					$rootScope.wetClothes += 100 - $rootScope.cleanClothes - $rootScope.wetClothes;
				}
				else
				{
					$rootScope.wetClothes += value;
				}
				break;
			case "wetClothes":
				if($rootScope.wetClothes <= value)
				{
					$rootScope.cleanClothes += $rootScope.wetClothes;
					$rootScope.wetClothes = statusBarFloorValue;
				}
				else
				{
					$rootScope.wetClothes -= value;
					$rootScope.cleanClothes += value;
				}
			case "car":
				if($rootScope.carBattery + value > 100)
				{
					$rootScope.carBattery = 100;
				}
				else
				{
					$rootScope.carBattery += value;
				}
				break;
		}
        $rootScope.saveData();
    });
	
	$scope.$watch('dateEpoch', function() {
		var hourChange = ($scope.dateEpoch - $rootScope.lastEpochUpdate)/3600;
		$rootScope.lastEpochUpdate = $scope.dateEpoch;
		$dishChange = hourToPercentDrop(4,hourChange);
		$laundryChange = hourToPercentDrop(21,hourChange);
		$hygieneChange = hourToPercentDrop(14,hourChange);

        if(($scope.dateEpoch - $scope.lastSave)/60/60/24 >= 1)
        {
            $rootScope.saveData();
            $rootScope.lastSave = $scope.dateEpoch;
        }

        $rootScope.happiness = ($rootScope.dishes+$rootScope.hygiene+$rootScope.cleanClothes)/3;

        if(!angular.isUndefined($rootScope.balanceMove))
        {
        	$rootScope.score += Math.round(hourChange*$rootScope.happiness*2 + balanceFactor*$rootScope.balanceMove);
        	$rootScope.balanceMove = 0;

        }

		if($rootScope.dishes - $dishChange < 0)
		{
			$rootScope.dishes = statusBarFloorValue;
		}
		else
		{
			$rootScope.dishes -= $dishChange;
		}

		if($rootScope.cleanClothes - $laundryChange < 0)
		{
			$rootScope.cleanClothes = statusBarFloorValue;
		}
		else
		{
			$rootScope.cleanClothes -= $laundryChange;
		}

		if($rootScope.hygiene - $hygieneChange < 0)
		{
			$rootScope.hygiene = statusBarFloorValue;
		}
		else
		{
			$rootScope.hygiene -= $hygieneChange;
		}

        var hourOfLastUpdate = $scope.lastEpochUpdate / 60 / 60;
        var currentHour = $scope.dateEpoch / 60 / 60;
        currentHour = ((currentHour+2)%24);
        hourOfLastUpdate = (hourOfLastUpdate%24);
        var dayOfLastUpdate = $scope.lastEpochUpdate / 60 / 60 / 24;
        var currentDay = $scope.dateEpoch / 60 / 60 / 24;
        dayOfLastUpdate = Math.floor(dayOfLastUpdate%7);
        currentDay = Math.floor(currentDay%7);

        if(hourOfLastUpdate < 7 && 7 <= currentHour && !$scope.onWork && currentDay != 2 && currentDay !=3)
        {
        	if($rootScope.carBattery - ($rootScope.carChange * 2) > 0)
            {
            	$rootScope.carBattery -= $rootScope.carChange;
                $scope.onWork = true;
            }
            else if ($rootScope.carBattery - ($rootScope.carChange * 2) == 0)
            {
            	$rootScope.carBattery = statusBarFloorValue;
                $scope.onWork = true;
            }
        }

        if(hourOfLastUpdate < 17 && 17 <= currentHour && $scope.onWork && currentDay != 2 && currentDay !=3)
        {
            if($rootScope.carBattery - $rootScope.carChange > 0)
            {
            	$rootScope.carBattery -= $rootScope.carChange;
                $scope.onWork = false;
            }
            else
            {
                $rootScope.carBattery = statusBarFloorValue;
                $scope.onWork = false;
            }
        }
	});
}]);