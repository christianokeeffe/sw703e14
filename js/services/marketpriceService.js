'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_marketprice = api_url + "/marketprice";
var api_resource_averageprice = api_url + "/averageprice";

services.factory("marketpriceFactory", function($resource) {
    return $resource(api_resource_marketprice + "/:fromtime/:totime:endurl", {}, {
        getMarketPrice : { method: 'GET', isArray: false}
    });
});

services.factory("averageMarketPriceFactory", function($resource) {
    return $resource(api_resource_averageprice + ":endurl", {}, {
        getAverageMarketPrice : { method: 'GET', isArray: false}
    });
});