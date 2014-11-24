'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_resource_products = api_url + "/products";
var api_resource_userProduct = api_url + "/userproduct";
    	
services.factory("productsFactory", function($resource) {
    return $resource(api_resource_products + "/:userID:endurl", {}, {
        getAllProducts : { method: 'GET', isArray: false}
        });
});

services.factory("userproductsFactory", function($resource) {
    return $resource(api_resource_userProduct + ":endurl", {}, {
        updateProduct : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}},
        addUserProduct : { method: 'PUT', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
       	});
});
