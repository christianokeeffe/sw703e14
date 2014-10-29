var myApp = angular.module('smartgridgame');

myApp.controller('optionalTaskController', ['$scope', '$rootScope', 'optionalTaskFactory', 'formatRequest', function($scope, $rootScope, optionalTaskFactory, formatRequest) {
$scope.optionalTasks = {};
  
$scope.getOptionalTasks = function(){
var geturl = {};

    geturl = formatRequest.get({});
    if(geturl === undefined)
    {
      setTimeout(function(){
          return $scope.getOptionalTasks();
         }, 10);
    }
    else
    {
      optionalTaskFactory.optionalTask(geturl,
      function (response) {
        switch(response.status_code)
        {
          case '200':
            $scope.optionalTasks = response.data;
            for (var i = 0; i < $scope.optionalTasks.length; i++) {
            	$scope.optionalTasks[i].done = false;
            	$scope.optionalTasks[i].missed = false;
            }
            break;
        }
      },
      function () {
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getOptionalTasks();
  console.log(JSON.stringify($scope.optionalTasks));
}]);