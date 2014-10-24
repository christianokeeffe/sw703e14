var myApp = angular.module('smartgridgame');

myApp.controller('upgradeModalController', ['$scope', '$modalInstance','controllerService','allAppliancesFactory','formatRequest', 'tasksFactory', '$translate', function($scope, $modalInstance, controllerService, allAppliancesFactory, formatRequest, tasksFactory, $translate){

    $scope.appliances = null;
    $scope.calledApiFlag = false;
    $scope.result = [];

    $scope.getAllAppliances = function()
    {
        var geturl = formatRequest.get({});
        if(geturl === undefined)
        {
            setTimeout(function(){
                return $scope.getAllAppliances();
            }, 10);
        }
        else
        {
            allAppliancesFactory.allAppliances(geturl.endurl).then(function(data)
            {
                console.log(data);
                $scope.appliances = data;
                return data;
            });
        }
    };

    $scope.getAvailableUpgrades = function(selectedAppliance) {
        appliances = $scope.getAllAppliances();
        console.log("printing appliances");

        console.log($scope.getAllAppliances());
    };

    selectedApplication = controllerService.getAppliance();


    $scope.header = selectedApplication.name;
    //console.log($scope.getAvailableUpgrades(selectedApplication));

    $scope.getAvailableUpgrades(selectedApplication);

    //console.log($scope.getAvailableUpgrades(selectedApplication));


    $translate('actionModal.selectItem').then(function (translations){$scope.selectedItem = translations;});

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
      controllerService.setTask(selected);
      $modalInstance.close(input);
    }
  };

  $scope.cancel = function () {
    $scope.startGameTime();
    $modalInstance.dismiss('cancel');
  };
}]);