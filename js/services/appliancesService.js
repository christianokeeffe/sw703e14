'use strict';

/* Services */
var services = angular.module('smartgridgame.js.services');

var api_resource_appliances = api_url + "/appliances";

services.factory('appliancesFactory', function($resource) {
    return $resource(api_resource_appliances, {}, {
        getAppliances : { method: 'GET'}
    });
});