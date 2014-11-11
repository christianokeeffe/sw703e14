var myApp = angular.module('smartgridgame');

myApp.controller('settingsController', ['$scope','$rootScope','settingsFactory','formatRequest', function($scope, $rootScope,settingsFactory,formatRequest){
	$scope.settings = {};
	$scope.allow_discharge;
	$scope.dischargeVal;

	$scope.getSettings = function()
	{
		var geturl = formatRequest.get({});
		if(geturl === undefined)
		{
		  setTimeout(function(){
		  return $scope.getSettings();
		  }, 10);
		}
		else
		{ 
		  geturl.userID = 2;//$scope.getUserID();
		  var settingsPromise = settingsFactory.getSettings(geturl);

		  settingsPromise.$promise.then(function(response){
		    $scope.settings = response.data;
		    // the code you're looking for
			// iterate over each element in the array
			for (var i = 0; i < $scope.settings.length; i++){
			  // look for the entry with a matching `code` value
			  switch($scope.settings[i].prefname)
			  {
			  	case "allow_discharge":
					$scope.allow_discharge = $scope.settings[i].value == "true";
			  		break;
		  		case "dischargeVal":
		  			$scope.dischargeVal = parseInt($scope.settings[i].value)
		  			break;
			  }
			}
		  });
		}
	};

	$scope.getSettings();


	$scope.$watch('allowDischarge', function() {

	});
	$scope.$watch('dischargeVal', function() {

	});
}]);