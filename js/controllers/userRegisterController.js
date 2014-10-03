var myApp = angular.module('smartgridgame');

myApp.controller('userRegisterController', ['$scope','$interval','usersFactory','formatRequest', function($scope,$interval,usersFactory,formatRequest){
	$scope.user = {};

	$scope.regUser = function()
	{
	   var params = formatRequest.put($scope.user);
	  if(params === undefined)
	  {
	    setTimeout(function(){
	          return $scope.regUser();
	       }, 10);
	  }
	  else
	  { 
	    usersFactory.registerUser(params,
	    function (response) {
	        $scope.regUser = response.data;
	    },
	    function (response) {
	        //alert(JSON.stringify(response));
	        document.write(JSON.stringify(response));
	    });
	  }
	};  
} ]);