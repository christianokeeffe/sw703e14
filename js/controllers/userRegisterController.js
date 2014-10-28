var myApp = angular.module('smartgridgame');

myApp.controller('userRegisterController', ['$scope','$interval','usersFactory','formatRequest','$location', function($scope,$interval,usersFactory,formatRequest,$location){
	$scope.user = {};
	$scope.invalidEmail = false;

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
	    	switch(response.status_code)
	    	{
	    		case '200':
	    			$scope.regUser = response.data;
	    			$scope.invalidEmail = false;
	    			$location.path("/");
    				break;
				case '409':
					$scope.invalidEmail = true;
					break;
	    	}
	        
	    },
	    function (response) {
	        //alert(JSON.stringify(response));
	        document.write(JSON.stringify(response));
	    });
	  }
	};  
} ]);