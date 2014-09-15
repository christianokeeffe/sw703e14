(function(){
	
  var app = angular.module('smartgridgame', ['pascalprecht.translate']);
  app.config(['$translateProvider', function($translateProvider) {
  	// add translation table
  	$translateProvider.useStaticFilesLoader({
            prefix: './translations/',
            suffix: '.json'
        });
    $translateProvider.preferredLanguage('en');
	}]);
})();