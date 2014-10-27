'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_appliancesOfType = api_url + "/appliancesType";

services.factory('allAppliancesFactory', ['$http',
    function ($http) {
        return {
            allAppliances: function (endurl, type) {

                var promise = $http.get(api_resource_appliancesOfType + '/' + type + endurl).success(function(response) {
                    return response.data.data;
                }, function (error) {
                    //error
                })
                return promise;
            }
        }
    }
]);