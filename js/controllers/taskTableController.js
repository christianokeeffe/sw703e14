var myApp = angular.module('smartgridgame');

 myApp.controller('taskTableController', ['$scope','$modal', 'appliancesFactory','formatRequest', function($scope, $modal, appliancesFactory,formatRequest){
	//$scope.tableActionContent = appliancesFactory.getAppliances("", function (response) {
								//alert("HEJ");
							//};
  $scope.appliances = {};
  //formatRequest.get({});  

$scope.getAppliances = function()
{
   var geturl = formatRequest.get({});
  if(geturl === undefined)
  {
    setTimeout(function(){
          return $scope.getAppliances();
       }, 10);
  }
  else
  { 
    appliancesFactory.getAppliances(geturl,
    function (response) {
        $scope.appliances = response.data;
    },
    function () {
        //alert(JSON.stringify(response));
        document.write(JSON.stringify(response));
    });
  }
}  

	$scope.selected;

	$scope.open = function (selectedAction) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: actionModalController,
      size: 'sm',
      resolve: {
        tableActionContent: function () {
          return $scope.tableActionContent;
        },
        selectedAction: function(){
        	return selectedAction;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    });
  };

}]);

var actionModalController = function ($scope, $modalInstance, tableActionContent, selectedAction) {
	$scope.items = tableActionContent;
  	$scope.header = selectedAction;
    $scope.stringClose = "Close";
  	$scope.selected = "Select an item";

  	$scope.clicked = function(selectedItem){
  		$scope.selected = selectedItem;
  	}

  	$scope.ok = function () {
    	$modalInstance.close($scope.selected.item);
  	};

  	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
  	};
};
