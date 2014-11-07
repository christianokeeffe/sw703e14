'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_graphdata = api_url + "/graphdata";
    	

services.factory("graphdataFactory", function($resource) {
    return $resource(api_resource_graphdata + "/:userID:endurl", {}, {
    	loadGraphData : { method: 'GET', isArray: false},
    	saveGraphData : { method: 'PUT', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});