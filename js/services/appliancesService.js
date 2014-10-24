'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_appliances = api_url + "/appliances";
    	
services.factory("appliancesFactory", function($resource) {
    return $resource(api_resource_appliances + "/:userID:endurl", {}, {

        //getAppliancesPOST : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}},
        getAppliances : { method: 'GET', isArray: false}
    });
});

services.factory('allAppliancesFactory', ['$http',
    function ($http) {
        return {
            allAppliances: function (endurl) {

                var promise = $http.get(api_resource_appliances + endurl).then(function(response) {
                    return response.data;
                }, function (error) {
                    //error
                })
                return promise;
            }
        }
    }
]);

/*
services.factory("allAppliancesFactory", function($resource) {

    var allAppliances =  $resource(api_resource_appliances + "/:userID:endurl", {}, {
        getAllAppliances : { method: 'GET', isArray: false}
    });

    allAppliances.query("HELLO").$promise.then(function(result){ return result  })
});
*/

services.factory("tasksFactory", function($resource) {
    return $resource(api_resource_tasks+ "/:id:endurl", {}, {
        //getAppliancesPOST : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}},
        getTasks : { method: 'GET', isArray: false}
    });
});