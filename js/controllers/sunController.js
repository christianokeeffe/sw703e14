var myApp = angular.module('smartgridgame');

myApp.controller('sunController', ['$scope', '$rootScope', 'priceService', function($scope, $rootScope, priceService){
	$scope.sunlevel = 700;

	$scope.$watch('dateEpoch', function() {

        var currentSolarPrice = priceService.getCurrentSolarPrice($scope.dateEpoch);
        if(currentSolarPrice != undefined)
        {
            $scope.sunlevel = currentSolarPrice.price*70;
        }

		var currentHour = $scope.dateEpoch / 60 / 60;
		currentHour = ((currentHour+2)%24);
		var plusOrMinus = Math.random() < 0.5 ? -1 : 1;

		$scope.sunlevel = (-0.4647*(Math.pow(currentHour, 2))) + (10.462*currentHour);
        $scope.sunlevel *=4;

        if(currentHour <= 4)
        {
            $scope.sunlevel /=2;
        }

        if(currentHour < 8 && currentHour < 17)
        {
            $scope.sunlevel += ((Math.floor(Math.random() * 80) + 1)*plusOrMinus);
        }
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
     });

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