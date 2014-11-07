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
		console.log(startTime + " " + runningTime + " " + powerUsage);
		if(startTime + runningTime <= latesttime){
			var totalPrice = 0;
			for (var i = 0 ; i < runningTime ; i=i+3600) {
				
				if (runningTime-i < 3600){
					var timeToCalculate = runningTime
				}
				else{
					var timeToCalculate = 3600
				}
				totalPrice += (getPriceNow( startTime+i , powerUsage) /3600) * timeToCalculate;
			}
			if (powerUsage == 1800) {
				console.log(runningTime + " price: " + totalPrice);
			};
			return totalPrice;
		}
		else
		{
		    getData(startTime, runningTime + 3600*24*7);
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