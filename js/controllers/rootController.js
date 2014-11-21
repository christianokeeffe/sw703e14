var myApp = angular.module('smartgridgame');

myApp.controller('rootController', ['$scope','$location','$rootScope','$sessionStorage', function($scope,$location,$rootScope,$sessionStorage){

   $rootScope.tabView = true;

	if($sessionStorage.currentUser == "undefined")
	{
		$sessionStorage.currentUser = undefined;
	}
  else
  {
    $rootScope.sessions = $sessionStorage;
  }

	$scope.logout = function(){
      if($scope.speed != 4)
      {
        $rootScope.stopGameTime();
      }
    	$sessionStorage.currentUser = "undefined";
    	$location.path("/logout");
  	};

  	$scope.showLogout = function()
  	{
  		return $sessionStorage.currentUser !== undefined;
  	}

    $scope.changeView = function()
    {
      if($rootScope.tabView)
      {
        $rootScope.tabView = false;
      }
      else 
      {
        $rootScope.tabView = true;
      }
    }

    $scope.changeSpeed = function(input)
    {
      if($rootScope.speed == 4)
      {
        $rootScope.startGameTime();
      }

      $rootScope.speed = input;
      if (input == 1)
      {
        $rootScope.gameSecOnRealSec = 900;
      }
      else if (input == 2)
      {
        $rootScope.gameSecOnRealSec = 1800;
      }
      else if (input == 3)
      {
        $rootScope.gameSecOnRealSec = 3600;
      }
      else
      {
        $rootScope.stopGameTime();
      }
    }
}]);
