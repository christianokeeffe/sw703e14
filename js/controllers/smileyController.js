var myApp = angular.module('smartgridgame');

myApp.controller('smileyController', ['$scope','$rootScope', function($scope, $rootScope){
		
	function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
 
     $scope.$watch('happiness', function() {

     	if($rootScope.happiness > 100)
     	{
     		$rootScope.happiness = 100;
     	}
     	else if ($rootScope.happiness < 0)
     	{
     		$rootScope.happiness = 0;
     	}
     	var bezier = $rootScope.happiness - 50;

     	var r = 0.0;
     	var g = 0.0;
     	if($rootScope.happiness <= 50)
     	{
     		g = (($rootScope.happiness)/50)*255;
     		r = 255;
     	}
     	else
     	{
     		r = 255-(($rootScope.happiness-50)/50)*255;
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
}]);