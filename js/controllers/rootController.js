var myApp = angular.module('smartgridgame');

myApp.controller('rootController', ['$scope','$location','$rootScope','$sessionStorage', function($scope,$location,$rootScope,$sessionStorage){

	if($sessionStorage.currentUser == "undefined")
	{
		$sessionStorage.currentUser = undefined;
	}
  else
  {
    $rootScope.sessions = $sessionStorage;
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
}]);
