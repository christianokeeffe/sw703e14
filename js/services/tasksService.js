'use strict';

/* Services */
var services = angular.module('smartgridgame');
var api_resource_tasks = api_url + "/tasks";

services.factory("tasksFactory", function($resource) {
    return $resource(api_resource_tasks + ":endurl", {}, {
       	getTasks : { method: 'GET', isArray: false}
    });
});