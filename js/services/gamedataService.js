'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_gamedata = api_url + "/gamedata";
    	

services.factory("gamedataFactory", function($resource) {
    return $resource(api_resource_gamedata + ":endurl", {}, {
        saveGameData : { method: 'PUT', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});