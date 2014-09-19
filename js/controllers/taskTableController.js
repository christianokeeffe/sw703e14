var myApp = angular.module('smartgridgame');

myApp.controller('taskTableController', ['$scope','appliancesFactory', function($scope, appliancesFactory){
	$scope.tableActionContent=['Washer','Owen','Car','Dryer'];
	//$scope.tableActionContent = appliancesFactory.getAppliances("", function (response) {
								//alert("HEJ");
							//};
appliancesFactory.getAppliances(function(data) {
    alert("hej");
  });

	$scope.tableActionHeadA="Items";
	$scope.tableActionHeadB="Activate";

}]);