'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_appliances = api_url + "/appliances";
    	

services.factory("appliancesFactory", function($resource) {
    return $resource(api_resource_appliances, {}, {
        getAppliances : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});