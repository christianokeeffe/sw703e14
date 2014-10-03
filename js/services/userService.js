'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_user = api_url + "/user";
    	

services.factory("usersFactory", function($resource) {
    return $resource(api_resource_user + ":endurl", {}, {
        registerUser : { method: 'PUT', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});