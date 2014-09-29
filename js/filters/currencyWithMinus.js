/* taken from  http://stackoverflow.com/questions/17441254/why-angularjs-currency-filter-formats-negative-numbers-with-parenthesis*/
var app = angular.module('smartgridgame');

app.filter('currencyWithMinus', ["$filter", function ($filter) {       
    return function(amount, currencySymbol){
        var currency = $filter('currency');         

        if(amount < 0){
            return currency(amount, currencySymbol).replace("(", "-").replace(")", ""); 
        }

        return currency(amount, currencySymbol);
    };
}]);