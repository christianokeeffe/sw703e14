'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_products = api_url + "/products";
    	
services.factory("productsFactory", function($resource) {
    return $resource(api_resource_products + ":endurl", {}, {
        getAllProducts : { method: 'GET', isArray: false}
       	});
});
