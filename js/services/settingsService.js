'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_setting = api_url + "/settings";
    	

services.factory("settingsFactory", function($resource) {
    return $resource(api_resource_setting + "/:userID:endurl", {}, {
        getSettings : { method: 'GET', isArray: false}
    });
});