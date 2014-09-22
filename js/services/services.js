'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_url = "http://localhost/sw703e14-backend";

var publicHash = 'a2105103cd48b1a8601486fc52d8bb43a1156a49b2f36f1d28ed177d0203ba99';
var privateHash = 'c90adb0a3a6f0865062a639f5ad54f113f559031a658d503903ec48ced13078f';



//service style, probably the simplest one
services.service('formatRequest', ['$translate', function($translate) {
    this.format = function(input) {
		var input ={
		    'language' : $translate.use()
		};
		var stringInput = JSON.stringify(input);
    	var hash = String(CryptoJS.HmacSHA256(stringInput, privateHash));
    	var headersVar = {
	    'publicKey': publicHash,
	    'request': stringInput,
	    'requestHash':hash
	    };
        return headersVar;
    };
}]);
