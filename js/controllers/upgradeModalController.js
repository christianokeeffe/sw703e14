var myApp = angular.module('smartgridgame');

myApp.controller('upgradeModalController', ['$scope', '$rootScope', '$modalInstance','controllerService','allAppliancesFactory','formatRequest', 'tasksFactory', '$translate', function($scope, $rootScope, $modalInstance, controllerService, allAppliancesFactory, formatRequest, tasksFactory, $translate){

    $scope.appliances = [];

    $scope.calledApiFlag = false;
    $scope.result = [];

    //Colors
    var colors = {black:"#000", red:"#ff0000", green:"#27C200", btnDefault:"btn-default", btnGreen:"btn-success", btnRed: 'btn-danger'};

    $scope.currentEnergyConsumpCol = colors.black;
    $scope.selectedEnergyConsumpCol = colors.black;
    $scope.currentEnergyLabelCol = colors.black;
    $scope.selectedEnergyLabelCol = colors.black;
    $scope.btnUpgradeColor = colors.btnDefault;

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

    $scope.calTableColors = function(currentAppliance, selectedAppliance) {
        if(selectedAppliance.energyConsumption != undefined)
        {
            if(currentAppliance.energyConsumption > selectedAppliance.energyConsumption)
            {
                $scope.currentEnergyConsumpCol = colors.red;
                $scope.selectedEnergyConsumpCol = colors.green;
            }
            else if(currentAppliance.energyConsumption < selectedAppliance.energyConsumption)
            {
                $scope.currentEnergyConsumpCol = colors.green;
                $scope.selectedEnergyConsumpCol = colors.red;
            }

            if(currentAppliance.energyLabel.charAt(0) > selectedAppliance.energyLabel.charAt(0))
            {
                $scope.currentEnergyLabelCol = colors.red;
                $scope.selectedEnergyLabelCol = colors.green;
            }
            else if(currentAppliance.energyLabel.charAt(0) < selectedAppliance.energyLabel.charAt(0))
            {
                $scope.currentEnergyLabelCol = colors.green;
                $scope.selectedEnergyLabelCol = colors.red;
            }

            if(selectedAppliance.price < $scope.balance)
            {
                $scope.btnUpgradeColor = colors.btnGreen;
            }
            else
            {
                $scope.btnUpgradeColor = colors.btnRed;
            }
        }
    };

    $scope.chosenAppliance = selectedAppliance;


    $translate('upgradeModal.selectItem').then(function (translations){$scope.selectedItem = translations;});

    $scope.buttonStyle = "margin-bottom: -15px";
    $scope.selected;
    $scope.alertShown = false;

  $scope.clicked = function(selectedApplianceDrop) {
    $scope.selected = selectedApplianceDrop;

    $scope.calTableColors(selectedAppliance, selectedApplianceDrop);

    $scope.alertShown = false;
    $scope.selectedItem = $scope.selected.name;
  };

  $scope.ok = function (input, selected) {
    if (selected === undefined || selected.id == -1) {
      $scope.buttonStyle = "margin-bottom: 15px";
      $scope.alertShown = true;
    } else {
        if($rootScope.balance > selected.price)
        {
            controllerService.replaceAppliance(selected);
            $modalInstance.close(selected);
        }
        else
        {
            $scope.buttonStyle = "margin-bottom: 15px";
            $scope.alertCannotAfford = true;
        }
    }
  };

  $scope.cancel = function () {
    $scope.startGameTime();
    $modalInstance.dismiss('cancel');
  };
}]);