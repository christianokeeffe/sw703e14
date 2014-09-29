var myApp = angular.module('smartgridgame');

myApp.controller('languageController', ['$scope', '$translate', '$window','$cookies', function($scope, $translate, $window, $cookies){
	if($cookies.lang !== undefined)
	{
		$scope.lang = $cookies.lang;
	}
	else
	{
		$scope.lang = "en";
	}
	$translate.use($scope.lang);
	var first = true;
	$scope.isDa = $scope.lang === "da";
	$scope.isEn = $scope.lang == "en";

	$scope.setLang = function(langtoset)
	{
		$scope.lang = langtoset;
		$translate.use($scope.lang);
		$cookies.lang = $scope.lang;
		$window.location.href = "http://localhost/sw703e14";
		$window.location.reload();
	}
}]);