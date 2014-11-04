'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_dailyTask = api_url + "/dailyTask";
var api_resource_optionalTask = api_url + "/optionalTask";

services.factory("dailyTaskFactory", function($resource) {
    return $resource(api_resource_dailyTask + ":endurl", {}, {
        dailyTask : { method: 'GET', isArray: false}
    });
});

services.factory("optionalTaskFactory", function($resource) {
    return $resource(api_resource_optionalTask + ":endurl", {}, {
        optionalTask : { method: 'GET', isArray: false}
    });
});