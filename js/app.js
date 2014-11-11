(function(){
	
  var app = angular.module('smartgridgame', ['pascalprecht.translate','ui.bootstrap','ngResource', 'ngStorage', 'ngRoute','ngCookies','ngDropdowns','timer']);

  app.config(['$locationProvider','$routeProvider',
  function($locationProvider,$routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './views/mainView.html'
      }).
      when('/reg-user', {
        templateUrl: './views/regUser.html'
      }).
      when('/login', {
        templateUrl: './views/userLogin.html'
      }).
      when('/settings', {
        templateUrl: './views/settingspage.html'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  
  app.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($q) {
    var realEncodeURIComponent = window.encodeURIComponent;
    return {
      'request': function(config) {
         window.encodeURIComponent = function(input) {
           return realEncodeURIComponent(input).split("%2F").join("/"); 
         }; 
         return config || $q.when(config);
      },
      'response': function(config) {
         window.encodeURIComponent = realEncodeURIComponent;
         return config || $q.when(config);
      }
    };
  });
});

    //////////////////CACHE REMOVE START ////////////////////
    app.run(function($rootScope, $templateCache) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if (typeof(current) !== 'undefined'){
                $templateCache.remove(current.templateUrl);
            }
        });
    });
    //////////////////CACHE REMOVE STOP/////////////////////

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