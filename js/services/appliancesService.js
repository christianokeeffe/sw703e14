'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_appliances = api_url + "/appliances";
var api_resource_tasks = api_url + "/task";
    	
services.factory("appliancesFactory", function($resource) {
    return $resource(api_resource_appliances + ":endurl", {}, {
        //getAppliancesPOST : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}},
        getAppliances : { method: 'GET', isArray: false}
    });
});

services.factory("tasksFactory", function($resource) {
    return $resource(api_resource_tasks+ "/:id:endurl", {}, {
        //getAppliancesPOST : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}},
        getTasks : { method: 'GET', isArray: false}
    });
});