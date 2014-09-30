var myApp = angular.module('smartgridgame');

myApp.controller('userLoginController', ['$scope','userFactory','formatRequest' function($scope, userFactory, formatRequest){

  $scope.findUser = function()
{
   var geturl = formatRequest.get({});
  if(geturl === undefined)
  {
    setTimeout(function(){
          return $scope.findUser();
       }, 10);
  }
  else
  { 
    userFactory.findUser(geturl,
    function (response) {
        if(response.data != null) {
          //login
        }
        else {
          // error
        }
    },
    function () {
        //alert(JSON.stringify(response));
        document.write(JSON.stringify(response));
    });
  }
} 
  $scope.Login = function(inputUser, inputPassword){
  };
  }]);