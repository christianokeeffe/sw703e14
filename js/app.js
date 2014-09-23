(function(){
	
  var app = angular.module('smartgridgame', ['pascalprecht.translate','ui.bootstrap','ngResource', 'ngRoute','ngCookies','ngDropdowns']);
  app.config(['$translateProvider', function($translateProvider) {
  	// add translation table
  	$translateProvider.useStaticFilesLoader({
            prefix: './translations/',
            suffix: '.json'
        });
    $translateProvider.preferredLanguage('en');
    
	}]).run(['$cookies', '$translate', function($cookies,$translate){
    var lang = $cookies.lang;
    if(lang != null)
    {
      $translate.use('da');
    }
  }]);
})();