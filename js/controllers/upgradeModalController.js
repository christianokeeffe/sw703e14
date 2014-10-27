var myApp = angular.module('smartgridgame');

myApp.controller('upgradeModalController', ['$scope', '$modalInstance','controllerService','allAppliancesFactory','formatRequest', 'tasksFactory', '$translate', function($scope, $modalInstance, controllerService, allAppliancesFactory, formatRequest, tasksFactory, $translate){

    $scope.appliances = [];

    $scope.calledApiFlag = false;
    $scope.result = [];


    var geturl = formatRequest.get({});

    selectedAppliance = controllerService.getAppliance();

    allAppliancesFactory.allAppliances(geturl.endurl, selectedAppliance.type).then(function(result)
    {
        var data = result.data.data;
        data.forEach(function(entry) {
            if(entry.id != selectedAppliance.id)
            {
                $scope.appliances.push(entry);
            }
        });

        if($scope.appliances.length == 0)
        {
            var noUpgrade = {name:"No upgrade available", id:-1};
            $scope.appliances.push(noUpgrade);
        }
    });

    $scope.header = selectedAppliance.name;


    $translate('upgradeModal.selectItem').then(function (translations){$scope.selectedItem = translations;});

    $scope.buttonStyle = "margin-bottom: -15px";
    $scope.selected;
    $scope.alertShown = false;

  $scope.clicked = function(selectedTask) {
    $scope.selected = selectedTask;
    $scope.alertShown = false;
    $scope.selectedItem = $scope.selected.name;
  };

  $scope.ok = function (input, selected) {
    if (selected === undefined) {
      $scope.buttonStyle = "margin-bottom: 15px";
      $scope.alertShown = true;
    } else {

      controllerService.replaceAppliance(selected);
        console.log(controllerService.getApplianceArray());
      $modalInstance.close(input);
    }
  };

  $scope.cancel = function () {
    $scope.startGameTime();
    $modalInstance.dismiss('cancel');
  };
}]);