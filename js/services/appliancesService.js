'use strict';

/* Services */
var app = angular.module('smartgridgame');

var api_resource_appliances = api_url + "/appliances";

app.factory("appliancesFactory", function($resource, $translate) {
    return $resource(api_resource_appliances + "/" +$translate.use(), {}, {
        getAppliances : { method: 'GET'}
    });
});