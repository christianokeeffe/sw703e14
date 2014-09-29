var myApp = angular.module('smartgridgame');

myApp.controller('statusController', ['$scope', function($scope){
	$scope.dishes = 100;
	$scope.lastHourUpdate = 0;
	$scope.hygiene = 100;
	$scope.laundry = 100;
	$scope.score = 0;

	function hourToPercentDrop(fullPercentDropInDays,numbOfHours)
	{
		return (numbOfHours/(fullPercentDropInDays*24))*100;
	}

	$scope.$watch('hour', function() {
		var hourChange = $scope.hour - $scope.lastHourUpdate;
		$scope.lastHourUpdate = $scope.hour;
		$dishChange = hourToPercentDrop(4,hourChange);
		$laundryChange = hourToPercentDrop(21,hourChange);
		$hygieneChange = hourToPercentDrop(14,hourChange);
		
		if($scope.dishes - $dishChange < 0)
		{
			$scope.dishes = 0;
		}
		else
		{
			$scope.dishes -= $dishChange;
		}

		if($scope.laundry - $laundryChange < 0)
		{
			$scope.laundry = 0;
		}
		else
		{
			$scope.laundry -= $laundryChange;
		}

		if($scope.hygiene - $hygieneChange < 0)
		{
			$scope.hygiene = 0;
		}
		else
		{
			$scope.hygiene -= $hygieneChange;
		}
	});

	$scope.getStatusType = function(value)
	{
		$scope.happiness = ($scope.dishes+$scope.hygiene+$scope.laundry)/3;
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
	  canvas.width = canvas.width;
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
}]);