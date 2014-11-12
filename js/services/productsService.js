'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_products = api_url + "/products";
    	
services.factory("productsFactory", function($resource) {
    return $resource(api_resource_products + ":endurl", {}, {
        getProducts : { method: 'GET', isArray: false},
        insertProducts : { method: 'PUT', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});
