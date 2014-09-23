var myApp = angular.module('smartgridgame');

myApp.controller('languageController', ['$scope', '$translate', '$window','$cookies', function($scope, $translate, $window, $cookies){
	$scope.lang = $cookies.lang;
	var first = true;
	$scope.$watch('lang', function() {
		$translate.use($scope.lang);
		$cookies.lang = $scope.lang;
		if(first)
		{
			first = false;
		}
		else
		{
			$window.location.href = "http://localhost/sw703e14";
			$window.location.reload();
		}
	});
}]);