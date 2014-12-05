'use strict';

/* Services */
var services = angular.module('smartgridgame');

var api_url = "http://localhost/sw703e14-backend";
//var api_url = "http://api.smartgrid.okeeffe.dk";

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
        /*
        console.log("-----------------------------------------------------------------------------");
        console.log("Checking session:");
        console.log("session id: " + sessionid);
        console.log("session end : " + sessionend);
        console.log("time now    : " + new Date().getTime());
        console.log("time + 1 min: " + (new Date().getTime() + 60000));
        console.log("-----------------------------------------------------------------------------");
        */

		if((sessionid === undefined || new Date().getTime() + 60000 >= sessionend) && !isCalled)
		{
            sessionid = undefined;
            sessionend = undefined;
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
                    //console.log("Got session: ");
                    sessionid = response.data.session;
                    //console.log(sessionid);
                    //console.log("expires:")
                    sessionend = new Date(response.data.expire).getTime();
                    //console.log(sessionend);
                    isCalled = false;
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

    //latex start apiPost
    this.post = function(input) {
        if (thisvar.checkSession()) {
            input.language = $translate.use();
            var stringInput = JSON.stringify(input);
            var hash = String(CryptoJS.HmacSHA256(stringInput, privateHash));
            var headersVar = {
                'publicKey': publicHash,
                'request': stringInput,
                'requestHash':hash,
                'session':sessionid
            };
            return headersVar;
        }
    };
    //latex end
    this.put = function(input) {
    	if (thisvar.checkSession()) {
	    	input.language = $translate.use();
			var stringInput = JSON.stringify(input);
	    	var hash = String(CryptoJS.HmacSHA256(stringInput, privateHash));
	    	var headersVar = {
		    'publicKey': publicHash,
		    'request': stringInput,
		    'requestHash':hash,
		    'session':sessionid
		    };
	        return headersVar;
        }
    };
    //latex start apiGet
    this.get = function(input) {
    	if (thisvar.checkSession()) {
	    	input.endurl = "/" + $translate.use() + "/" + sessionid;
	        return input;
        }
    };
    //latex end
}]);

services.factory("authFactory", function($resource) {
    return $resource(api_url + '/auth', {}, {
        getSession : { method: 'POST', isArray: false, params: {'publicKey': '@publicKey', 'request':'@request', 'requestHash':'@requestHash'}}
    });
});

 services.factory('authFactoryNew', ['$http', function ($http) {
    return {
        getSession: function (headersVar) {

        var promise = $http.post(api_url + '/auth', {'publicKey': headersVar.publicKey, 'request':headersVar.request, 'requestHash':headersVar.requestHash}).then(function(response) {
            return response.data.data;
        }, function (error) {
            //error
        })
        return promise;
    }
 }
 }
 ]);
