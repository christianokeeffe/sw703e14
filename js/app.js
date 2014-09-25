(function(){
	
  var app = angular.module('smartgridgame', ['pascalprecht.translate','ui.bootstrap','ngResource', 'timer']);
  app.config(['$translateProvider', function($translateProvider) {
  	// add translation table
  	$translateProvider.useStaticFilesLoader({
            prefix: './translations/',
            suffix: '.json'
        });
    $translateProvider.preferredLanguage('en');
	}]);
})();