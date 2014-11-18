var myApp = angular.module('smartgridgame');

myApp.service('priceService',['formatRequest','marketpriceFactory', function(formatRequest,marketpriceFactory) {
	latesttime = 0;
	timevars = {};

    function isInt(n){
        return typeof n== "number" && isFinite(n) && n%1===0;
    }

    function roundTime(time) {
    	return time - (time%3600);
    }

	getData = function(fromtime, totime) {
		fromtime = roundTime(fromtime);
		totime = roundTime(totime);
		geturl = formatRequest.get({});
		    if(geturl === undefined)
		    {
		      setTimeout(function(){
		          return getData(fromtime,totime);
		         }, 10);
		    }
		    else
		    {
                if(!isInt(fromtime) || !isInt(totime))
                {
                    fromtime = 1409565600;
                    totime = 1409565600;
                }
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
			timenow = roundTime(timenow);
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
					var jump = 3600;
					if(j+3600 > duration)
					{
						jump = duration%3600;
					}
					thisprice += (parseFloat(timevars[id+((i-timenow)/3600)+(j/3600)].price)/3600)*jump;
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
		//console.log("starttime: " +  startTime + " latesttime: "+latesttime);
		starttime = roundTime(startTime);
		if(startTime + runningTime <= latesttime){
			var totalPrice = 0;
			//console.log("test 42");
			for (var i = 0 ; i < runningTime ; i=i+3600) {
				var timeToCalculate =3600;
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
			//console.log("test");
		    getData(startTime - 3600, startTime + 3600*24*7);
		}
	};

	this.getTotalSolarPrice = function(startTime, runningTime, watt) {
		if(startTime + runningTime <= latesttime){
			var totalPrice = 0;

			for (var i = 0 ; i < runningTime ; i=i+3600) {
				var timeToCalculate =3600;
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
		time = roundTime(time);
		if(time <= latesttime){
			var price = 0;
			var id = 0;
			while(parseInt(timevars[id].time) != time)
			{
				id++;
			}
			price = watt * parseFloat(timevars[id].solar_price_per_unit);
			return price;
		}
		else
		{
		    getData(time, time + 3600*24*7);
		}

	};



	getPriceNow = function(time, powerUsage) {
		time = roundTime(time);
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
    	timenow = roundTime(timenow);
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