var app = angular.module('AgenciesApp', []);

app.factory('Agencies', function ($http) {


  var agenciesApi = {};

  agenciesApi.getAgencies = function(){
    return $http({
      method: "GET",
      url: "/api/agency"
    });
  };

  return agenciesApi;

});


app.controller('agencyCtrl', function($scope, Agencies) {

  Agencies.getAgencies().success(function(response) {
    $scope.agencies = response;
  });

});
