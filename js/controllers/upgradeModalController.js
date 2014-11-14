var myApp = angular.module('smartgridgame');

myApp.controller('upgradeModalController', ['$scope', '$rootScope', '$modalInstance','controllerService','allAppliancesFactory','formatRequest', 'tasksFactory', '$translate', function($scope, $rootScope, $modalInstance, controllerService, allAppliancesFactory, formatRequest, tasksFactory, $translate){

    selectedAppliance = controllerService.getAppliance();
    $scope.calledApiFlag = false;
    $scope.result = [];
    $scope.appliances = $rootScope.allAppliances.where({ type: selectedAppliance.type  });

    for(var i = $scope.appliances.length; i--;) {
        if($scope.appliances[i].id === selectedAppliance.id) {
            $scope.appliances.splice(i, 1);
        }
    }

    //Colors
    var colors = {black:"#000", red:"#ff0000", green:"#27C200", btnDefault:"btn-default", btnGreen:"btn-success", btnRed: 'btn-danger'};

    $scope.currentEnergyConsumpCol = colors.black;
    $scope.selectedEnergyConsumpCol = colors.black;
    $scope.currentEnergyLabelCol = colors.black;
    $scope.selectedEnergyLabelCol = colors.black;
    $scope.btnUpgradeColor = colors.btnDefault;

    $scope.calTableColors = function(currentAppliance, selectedAppliance) {
        if(selectedAppliance.energyConsumption != undefined)
        {
            if(parseInt(currentAppliance.energyConsumption) > parseInt(selectedAppliance.energyConsumption))
            {
                $scope.currentEnergyConsumpCol = colors.red;
                $scope.selectedEnergyConsumpCol = colors.green;
            }
            else if(parseInt(currentAppliance.energyConsumption) < parseInt(selectedAppliance.energyConsumption))
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
            $rootScope.billPassiveHelper = 0;
            if(selected.type == "2") {
                $rootScope.carChange = selected.energyConsumption*3;
                $rootScope.carBattery = 100;
            }
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
    $modalInstance.dismiss('cancel');
  };
}]);