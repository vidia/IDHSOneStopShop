var app = angular.module('ServicesApp', []);

app.factory('Services', function ($http) {


  var serviceApi = {};

  serviceApi.getServices = function(){
    return $http({
      method: "GET",
      url: "/api/service"
    });
  };

  return serviceApi;

});


app.controller('serviceCtrl', function($scope, Services) {

  Services.getServices().success(function(response) {
    $scope.services = response;
  });

});
