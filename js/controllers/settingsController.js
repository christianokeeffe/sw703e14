var myApp = angular.module('smartgridgame');

myApp.controller('settingsController', ['$scope','$rootScope','settingsFactory','formatRequest', function($scope, $rootScope,settingsFactory,formatRequest){
	$scope.settings = {};

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
		  });
		}
	};

	$scope.getSettings();
}]);