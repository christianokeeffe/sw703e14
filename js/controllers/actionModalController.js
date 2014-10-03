var myApp = angular.module('smartgridgame');

<<<<<<< HEAD
myApp.controller('actionModalController', ['$scope','$modalInstance','lowPriceService','formatRequest', 'tasksFactory', function($scope, $modalInstance, formatRequest, tasksFactory, lowPriceService){
  $scope.items = lowPriceService.getTableContent();
  $scope.header = lowPriceService.getTask();
=======
myApp.controller('actionModalController', ['$scope','$modalInstance','TaskService','controllerService' , function($scope, $modalInstance, TaskService, controllerService){
  $scope.items = controllerService.getTableContent();
  $scope.header = controllerService.getTask();
>>>>>>> origin/protoBranch
  $scope.selectedItem = "selectItem"
  $scope.buttonStyle = "margin-bottom: -15px";
  $scope.selected;
  $scope.noTaskChosen = false;

  $scope.getApplianceTask = function (id){
    var geturl = formatRequest.get({});

    if(geturl === undefined)
    {
      setTimeout(function(){
        return $scope.getApplianceTask();
      }, 10);
    }
    else
    {
      geturl.id = id;
      tasksFactory.gettasks(geturl,
      function (response) {
        return $scope.test = response.data;
      },
      function () {
        //alert(JSON.stringify(response));
        document.write(JSON.stringify(response));
      });
    }
  };

  $scope.getApplianceTask(1);
  alert($scope.test);

  $scope.clicked = function(selectedItem) {
    $scope.selected = selectedItem;
    $scope.noTaskChosen = false;
    $scope.selectedItem = $scope.selected.name;
  };

  $scope.ok = function (input, selected) {
    if (selected === undefined) {
      $scope.buttonStyle = "margin-bottom: 15px";
      $scope.noTaskChosen = true;
    } else {
      var returnValues = {
        "mode": input,
        "item": selected
      };
      $modalInstance.close(returnValues);
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);