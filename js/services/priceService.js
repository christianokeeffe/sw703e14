var myApp = angular.module('smartgridgame');

myApp.service('priceService',['formatRequest','marketpriceFactory', function(formatRequest,marketpriceFactory) {
	latesttime = 0;
	timevars = {};

	getData = function(fromtime, totime) {
		geturl = formatRequest.get({});
		    if(geturl === undefined)
		    {
		      setTimeout(function(){
		          return getData(fromtime,totime);
		         }, 10);
		    }
		    else
		    { 
		      //geturl.fromtime = $scope.dateEpoch;
		      geturl.fromtime = fromtime;
		      geturl.totime = totime;
		      marketpriceFactory.getMarketPrice(geturl,
		      function (response) {
		        switch(response.status_code)
		        {
		          case '200':
		            timevars = response.data;

		            latesttime = totime;
		            break;
		        }
		      },
		      function () {
		        document.write(JSON.stringify(response));
		      });
		    }
		};

	this.getCheapestStarttime = function(timenow, endbefore, duration) {
		if(endbefore <= latesttime)
		{
			var beststart = timenow;
			var bestprice = 999999999999999999999;
			var id = 0;
			while(parseInt(timevars[id].time) != timenow)
			{
				id++;
			}
			for(var i = timenow; i <= endbefore - duration; i=i+3600)
			{
				var thisprice = 0;
				for(var j = 0; j < duration; j = j+3600)
				{
					thisprice += parseFloat(timevars[id+((i-timenow)/3600)+(j/3600)].price);
				}
				if(bestprice > thisprice)
				{
					bestprice = thisprice;
					beststart = i;
				}
			}
			return beststart;
		}
		else
		{
		    getData(timenow,endbefore);
		}
	};
	
	this.getTotalPrice = function(startTime, runningTime, powerUsage) {
		console.log("starttime: " +  startTime + " latesttime: "+latesttime);
		if(startTime + runningTime <= latesttime){
			var totalPrice = 0;
			console.log("test 42");
			for (var i = 0 ; i < runningTime ; i=i+3600) {
				var timeToCalculate =0;
				if (runningTime-i <= 3600) {
					timeToCalculate = runningTime;
				}
				else{
					timeToCalculate = 3600;
				}

				totalPrice += (getPriceNow( startTime+i , powerUsage) /3600) * timeToCalculate;
			}
			return totalPrice;
		}
		else
		{
			console.log("test");
		    getData(startTime - 3600, startTime + 3600*24*7);
		}
	};

	this.getTotalSolarPrice = function(startTime, runningTime, watt) {
		if(startTime + 3600*24 <= latesttime){
			var totalPrice = 0;

			for (var i = 0 ; i < runningTime ; i=i+3600) {
				var timeToCalculate =0;
				if (runningTime-i <= 3600) {
					timeToCalculate = runningTime;
				}
				else{
					timeToCalculate = 3600;
				}
				totalPrice += (getSolarPriceNow( startTime+i , watt) /3600) * timeToCalculate;

			}
			return totalPrice;
		}
		else
		{
		    getData(startTime - 3600, startTime + 3600*24*7);
		}
	};

	getSolarPriceNow = function(time, watt) {

		if(time <= latesttime){
			var price = 0;
			var id = 0;
			while(parseInt(timevars[id].time) != time)
			{
				id++;
			}
			price = watt * parseFloat(timevars[id].solar_price_per_unit);
			console.log(JSON.stringify(timevars[id]));
			return price;
		}
		else
		{
		    getData(time, time + 3600*24*7);
		}

	};



	getPriceNow = function(time, powerUsage) {

		if(time <= latesttime){
			var price = 0;
			var id = 0;
			while(parseInt(timevars[id].time) != time)
			{
				id++;
			}
			price = powerUsage * parseFloat(timevars[id].price);
			return price;
		}
		else
		{
		    getData(time, time + 3600*24*7);
		}

	};

    this.getCurrentSolarPrice = function(timenow) {
        if(timenow <= latesttime)
        {
            var id = 0;
            while(parseInt(timevars[id].time) != timenow)
            {
                id++;
            }

            return timevars[id];
        }
        else
        {
            getData(timenow,timenow+(3600*24*7));
        }
    };
}]);