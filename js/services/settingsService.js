'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_setting = api_url + "/setting";
    	

services.factory("settingsFactory", function($resource) {
    return $resource(api_resource_setting + "s/:userID:endurl", {}, {
        getSettings : { method: 'GET', isArray: false}
    });
});
services.factory("settingsPostFactory", function($resource) {
    return $resource(api_resource_setting, {}, {
        saveGameData : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});