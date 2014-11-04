var myApp = angular.module('smartgridgame');

myApp.controller('statusController', ['$scope','$rootScope', function($scope, $rootScope){
	$rootScope.dishes = 100;
	$rootScope.lastEpochUpdate = $scope.dateEpoch;
	$rootScope.hygiene = 100;
	$rootScope.laundry = 100;
    $rootScope.carBattery = 100;
	$rootScope.score = 0;
    $scope.carBatCount = 0;
    $scope.sunlevel = 700;


	var statusBarFloorValue = 0.1;

	function hourToPercentDrop(fullPercentDropInDays,numbOfHours)
	{
		return (numbOfHours/(fullPercentDropInDays*24))*100;
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
				if($rootScope.laundry + value > 100)
				{
					$rootScope.laundry = 100;
				}
				else
				{
					$rootScope.laundry += value;
				}
				break;
		}	
    });

	$scope.$watch('dateEpoch', function() {
		var hourChange = ($scope.dateEpoch - $rootScope.lastEpochUpdate)/3600;
		$rootScope.lastEpochUpdate = $scope.dateEpoch;
		$dishChange = hourToPercentDrop(4,hourChange);
		$laundryChange = hourToPercentDrop(21,hourChange);
		$hygieneChange = hourToPercentDrop(14,hourChange);

        $scope.happiness = ($rootScope.dishes+$rootScope.hygiene+$rootScope.laundry+$rootScope.carBattery)/3;

        $rootScope.score += Math.round(hourChange*$scope.happiness);

		if($rootScope.dishes - $dishChange < 0)
		{
			$rootScope.dishes = statusBarFloorValue;
		}
		else
		{
			$rootScope.dishes -= $dishChange;
		}

		if($rootScope.laundry - $laundryChange < 0)
		{
			$rootScope.laundry = statusBarFloorValue;
		}
		else
		{
			$rootScope.laundry -= $laundryChange;
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

        var curSunLevel = (currentHour+12)%24
        var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

        $scope.sunlevel = (-0.4647*(Math.pow(currentHour, 2))) + (10.462*currentHour);
        $scope.sunlevel *=4;

        if(currentHour <= 4)
        {
            $scope.sunlevel /=2;
        }

        if(currentHour < 8 && currentHour < 17)
        {
            $scope.sunlevel += ((Math.floor(Math.random() * 80) + 1)*plusOrMinus)
        }



        console.log("hour: " + currentHour + " sun level: " + $scope.sunlevel);

        var dayOfLastUpdate = $scope.lastEpochUpdate / 60 / 60 / 24;
        var currentDay = $scope.dateEpoch / 60 / 60 / 24;

        dayOfLastUpdate = Math.floor(dayOfLastUpdate%7);
        currentDay = Math.floor(currentDay%7);

        if( (hourOfLastUpdate < 7 && 7 <= currentHour) || (hourOfLastUpdate < 17 && 17 <= currentHour) )
        {
            if(currentDay != 2 && currentDay !=3 )
            {
                if($rootScope.carBattery - 10 <= 0)
                {
                    $rootScope.carBattery = statusBarFloorValue;
                }
                else
                {
                    $rootScope.carBattery -= 10;
                }
            }
        }
	});

	$scope.getStatusType = function(value)
	{
		if(value < 25)
		{
			return 'danger';
		}
		if(value < 50)
		{
			return 'warning';
		} 
		else if(value < 75)
		{
			return 'info';
		}
		else 
		{
			return 'success';
		}
	};
	
	function rgbToHex(r, g, b) {
    	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
     
     $scope.$watch('happiness', function() {

     	if($scope.happiness > 100)
     	{
     		$scope.happiness = 100;
     	}
     	else if ($scope.happiness < 0)
     	{
     		$scope.happiness = 0;
     	}
     	var bezier = $scope.happiness - 50;

     	var r = 0.0;
     	var g = 0.0;
     	if($scope.happiness <= 50)
     	{
     		g = (($scope.happiness)/50)*255;
     		r = 255;
     	}
     	else
     	{
     		r = 255-(($scope.happiness-50)/50)*255;
     		g = 255;
     	}

     	//alert("R:" + r + " G:" + g);

     	var faceColor = rgbToHex(r,g,0);

       // variable that decides if something should be drawn on mousemove
      var drawing = false;
	  var canvas = document.getElementById('face');
	  var context = canvas.getContext('2d');
	  var centerX = canvas.width / 2;
	  var centerY = canvas.height / 2;
	  var radius = 70;
	  var eyeRadius = 10;
	  var eyeXOffset = 25;
	  var eyeYOffset = 20;
	  var mouthXOffset = 40;
	  var mouthYOffset = parseInt(bezier)/3-20;
	  var bezierOffset = parseInt(bezier);


	  
	  // draw the yellow circle
	  context.beginPath();
	  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	  context.fillStyle = faceColor;
	  context.fill();
	  context.lineWidth = 5;
	  context.strokeStyle = 'black';
	  context.stroke();
	    
	  // draw the eyes
	  context.beginPath();
	  var eyeX = centerX - eyeXOffset;
	  var eyeY = centerY - eyeXOffset;
	  context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
	  var eyeX = centerX + eyeXOffset;
	  context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
	  context.fillStyle = 'black';
	  context.fill();
	  
	  // draw the mouth
	  context.beginPath();
	  var mouthLeftX = centerX - mouthXOffset;
	  var mouthY = centerY - mouthYOffset;
	  var mouthRightX = centerX + mouthXOffset;
	  var bezierY = 0;
	  bezierY = mouthY+bezierOffset;
	  context.moveTo(mouthLeftX,mouthY);
	  context.bezierCurveTo(mouthLeftX,bezierY,mouthRightX,bezierY,mouthRightX,mouthY);
	  //context.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
	  context.strokeStyle = 'black';
	  context.stroke();
   });

    function drawLine(context, fromX, fromY, toX, toY, color)
    {
        context.beginPath();
        context.lineCap="square";
        context.fillStyle = color;
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    }

    $scope.$watch('sunlevel', function() {

        if($scope.sunlevel > 1000)
        {
            $scope.sunlevel = 1000;
        }
        else if ($scope.sunlevel < 0)
        {
            $scope.sunlevel = 0;
        }
        var bezier = $scope.sunlevel - 50;
        var r = 0.0;
        var g = 0.0;

        r = (($scope.sunlevel));
        g = (($scope.sunlevel));

        var sunColor = rgbToHex(r,g,0);

        // variable that decides if something should be drawn on mousemove
        var canvas = document.getElementById('sun');
        var context = canvas.getContext('2d');
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = 40;


        // draw the yellow circle
        context.beginPath();
        context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        context.fillStyle = sunColor;
        context.fill();
        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();

        //Sun beams
        drawLine(context, centerX + 50, centerY, centerX + 300, centerY, sunColor);
        drawLine(context, centerX - 50, centerY, centerX - 300, centerY, sunColor);
        drawLine(context, centerX, centerY + 50, centerX, centerY + 300, sunColor);
        drawLine(context, centerX, centerY - 50, centerX, centerY - 300, sunColor);

        drawLine(context, centerX + (centerX/2), centerY + (centerY/2), centerX*1.3 + centerX/2, centerY*1.3 + centerY/2, sunColor);
        drawLine(context, centerX*0.7 - centerX/2,centerY*0.7 - centerY/2, centerX - (centerX/2), centerY - (centerY/2), sunColor);
        drawLine(context, centerX*1.3 + centerX/2,centerY*0.7 - centerY/2, centerX + (centerX/2), centerY - (centerY/2), sunColor);
        drawLine(context, centerX - (centerX/2), centerY + (centerY/2), centerX*0.7 - centerX/2,centerY*1.3 + centerY/2, sunColor);

    });
}]);