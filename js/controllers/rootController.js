var myApp = angular.module('smartgridgame');

myApp.controller('rootController', ['$scope','$location','$rootScope','$sessionStorage', function($scope,$location,$rootScope,$sessionStorage){

	if($sessionStorage.currentUser == "undefined")
	{
		$sessionStorage.currentUser = undefined;
	}

	$scope.logout = function(){
    	$rootScope.stopGameTime();
    	$sessionStorage.currentUser = "undefined";
    	$location.path("/logout");
  	};

  	$scope.showLogout = function()
  	{
  		return $sessionStorage.currentUser !== undefined;
  	}
}]);
