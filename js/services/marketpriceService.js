'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_marketprice = api_url + "/marketprice";
    	

services.factory("marketpriceFactory", function($resource) {
    return $resource(api_resource_marketprice + "/:fromtime/:totime:endurl", {}, {
        getMarketPrice : { method: 'GET', isArray: false}
    });
});