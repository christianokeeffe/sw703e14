'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_url = "http://localhost/sw703e14-backend";

var publicHash = 'a2105103cd48b1a8601486fc52d8bb43a1156a49b2f36f1d28ed177d0203ba99';
var privateHash = 'c90adb0a3a6f0865062a639f5ad54f113f559031a658d503903ec48ced13078f';
var sessionid;
var sessionend;


//service style, probably the simplest one
services.service('formatRequest', ['$translate','authFactory', function($translate, authFactory) {
    var thisvar = this;
    var isCalled = false;
	this.checkSession = function()
	{
		if((sessionid === undefined || new Date().getTime() + 500 >= sessionend) && !isCalled)
		{
			isCalled = true;
			var input = {};
			input.language = $translate.use();
			var stringInput = JSON.stringify(input);
	    	var hash = String(CryptoJS.HmacSHA256(stringInput, privateHash));
	    	var headersVar = {
		    'publicKey': publicHash,
		    'request': stringInput,
		    'requestHash':hash
		    };
		    authFactory.getSession(headersVar,
		    function (response) {
		        sessionid = response.data.session;
		        sessionend = new Date(response.data.expire).getTime();
		    	isCalled = false;
		        return true;
		    },
		    function (response) {
		        //alert(JSON.stringify(response));
		        isCalled = false;
		        document.write(JSON.stringify(response));
		    });
		    return false;
		}
		else if(sessionid !== undefined)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

    this.post = function(input) {
    	if (thisvar.checkSession()) {
	    	input.language = $translate.use();
			var stringInput = JSON.stringify(input);
	    	var hash = String(CryptoJS.HmacSHA256(stringInput, privateHash));
	    	var headersVar = {
		    'publicKey': publicHash,
		    'request': stringInput,
		    'requestHash':hash
		    };
	        return headersVar;
        }
		
    };
    this.get = function(input) {
    	if (thisvar.checkSession()) {
	    	input.endurl = "/" + $translate.use() + "/" + sessionid;
	        return input;
        }
    };
}]);

services.factory("authFactory", function($resource) {
    return $resource(api_url + '/auth', {}, {
        getSession : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});