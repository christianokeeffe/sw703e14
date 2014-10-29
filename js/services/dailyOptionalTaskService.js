'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_dailyOptionalTask = api_url + "/dailyTask";

services.factory("dailyOptionalTaskFactory", function($resource) {
    return $resource(api_resource_dailyOptionalTask + ":endurl", {}, {
        dailyOptionalTask : { method: 'GET', isArray: false}
    });
});