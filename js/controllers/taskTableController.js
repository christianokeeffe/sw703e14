var myApp = angular.module('smartgridgame');

myApp.Controller('taskTableController', ['$scope', function($scope){
	$scope.tableContent=['Washer','Owen','Car','Dryer'];
	
	$scope.tableHeadA="Items";
	$scope.tableHeadB="Activate";

}]);