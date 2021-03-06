var myApp = angular.module('smartgridgame');

myApp.controller('applianceTableController', ['$scope', '$rootScope', '$modal','appliancesFactory', 'allAppliancesFactory', 'formatRequest','controllerService', 'userApplianceFactory', 'tasksFactory','priceService', function($scope, $rootScope, $modal, appliancesFactory, allAppliancesFactory, formatRequest, controllerService, userApplianceFactory, tasksFactory,priceService){
    $scope.hasTasks = function(id) {
        return controllerService.checkApplianceHasTasks(id);
    };

    $scope.appliances = undefined;
    $rootScope.allAppliances = [];
    var geturl = undefined;

    $scope.hasUpgrades = function(type) {
        if($rootScope.allAppliances.length > 0)
        {
            var typeCount = $rootScope.allAppliances.where({ type: type });
            if(typeCount.length >= 2)
            {
                return true;
            }
        }
        return false;
    };
    $scope.getAppliances = function()
    {
        geturl = formatRequest.get({});
        if(geturl === undefined)
        {
            setTimeout(function(){
                return $scope.getAppliances();
            }, 10);
        }
        else
        {
            geturl.userID = $scope.getUserID();
            var appliancePromise = appliancesFactory.getAppliances(geturl);

            appliancePromise.$promise.then(function(response){
                $scope.appliances = response.data;
                controllerService.setApplianceArray($scope.appliances);
                for(i = 0; i < $scope.appliances.length; i++) {
                    if($scope.appliances[i].type == "2") {
                        $rootScope.carChange = parseInt($scope.appliances[i].energyConsumption) * 3;
                    }
                }
                $scope.getTasks();
            });
        }
    };

    $scope.getAllAppliances = function()
    {
        if(geturl === undefined)
        {
            setTimeout(function(){
                return $scope.getAllAppliances();
            }, 10);
        }
        else
        {
            allAppliancesFactory.allAppliances(geturl.endurl).then(function(result)
            {
                var data = result.data.data;
                data.forEach(function(entry) {
                    $rootScope.allAppliances.push(entry);
                });

            });
        }
    };

    $scope.getAllAppliances();

    $scope.getTasks = function (){
        var geturl = formatRequest.get({});
        if(geturl === undefined)
        {
            setTimeout(function(){
                return $scope.getTasks();
            }, 10);
        }
        else
        {
            var taskPromise = tasksFactory.getTasks(geturl);

            taskPromise.$promise.then(function(response){
                controllerService.StoreAllTasks(response.data);
            });
        }
    };

    $scope.getAppliances();

    $scope.openActionModal = function (selectedAction) {
        if ($rootScope.speed != 4)
        {
            $rootScope.stopGameTime();
        }
        controllerService.setAppliance(selectedAction);
        var modalInstance = $modal.open({
            templateUrl: 'views/actionModal.html',
            controller: 'actionModalController',
            size: 'sm'
        });

        modalInstance.result.then(function (returnValue) {
            if (returnValue == 'now') {
                $rootScope.startGameTime();
                if($scope.checkIndexOnCompleteList(controllerService.getAppliance().name) == -1)
                {
                    $scope.timersToSchedule.push({appliance: controllerService.getAppliance(), task: controllerService.getTask(), timerStarted: false})
                    $scope.completeScheduleList.push({appliance: controllerService.getAppliance(), task: controllerService.getTask(), timerStarted: false});
                } else {
                    alert("The chosen appliance is already in use!")
                };
            } else {
                if($scope.checkIndexOnCompleteList(controllerService.getAppliance().name) == -1) {
                    $scope.openLowPrice();
                } else {
                    alert("The chosen appliance is already in use!");
                };
            };
        }, function () {
            $rootScope.startGameTime();
        });
    };

    var addToScheduleList = function(scheduleObject)
    {
        var bestTime = priceService.getCheapestStarttime($scope.dateEpoch,scheduleObject.deadline,scheduleObject.task.executionTime);
        if(bestTime === undefined)
        {
            setTimeout(function(){
                return addToScheduleList(scheduleObject);
            }, 10);
        }
        else
        {
            scheduleObject.starttime = bestTime;
            $scope.datesToSchedule.push(scheduleObject);
            $scope.completeScheduleList.push(scheduleObject);
        }
    }

    $scope.openLowPrice = function() {
        var modalInstance = $modal.open({
            templateUrl: 'views/lowPriceModal.html',
            controller: 'lowPriceController',
            size: ""
        });

        modalInstance.result.then(function (schedule){
            addToScheduleList(schedule);
            $rootScope.startGameTime();
        }, function () {
            $rootScope.startGameTime();
        });
    };

    $scope.openUpgradeModal = function(selectedAction) {
        if ($rootScope.speed != 4)
        {
            $rootScope.stopGameTime();
        }
        controllerService.setAppliance(selectedAction);
        var modalInstance = $modal.open({
            templateUrl: 'views/upgradeModal.html',
            controller: 'upgradeModalController',
            size: ""
        });


        modalInstance.result.then(function (selectedUpgrade){
            $scope.appliances = controllerService.getApplianceArray();

            var applianceIDs = [];
            $scope.appliances.forEach(function(entry) {
                applianceIDs.push(entry.id);
            });

            var userid = $scope.getUserID();
            var request = {id:userid, appliances:applianceIDs};
            var params = {user_appliance:request};
            params = formatRequest.post(params);

            userApplianceFactory.updateUserAppliance(params,
                function (response) {
                    //call successful
                },
                function (response) {
                    //alert(JSON.stringify(response));
                    document.write(JSON.stringify(response));
                });

            $rootScope.setBalance($rootScope.balance - selectedUpgrade.price);
            $rootScope.saveData();
            $scope.getTasks();
            $rootScope.startGameTime();
        }, function () {
            $rootScope.startGameTime();
        });

    };
}]);