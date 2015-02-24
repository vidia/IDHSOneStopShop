var app = angular.module('AdminApp', []);



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

app.factory('Questions', function ($http) {

  var questionApi = {};

  questionApi.getQuestions = function(){
    return $http({
      method: "GET",
      url: "/api/question"
    });
  };

  return questionApi;

});

app.controller('surveyCtrl', function($scope, Questions) {

  Questions.getQuestions().success(function(response) {
    $scope.questions = response;
  });

});



app.controller('agencyCtrl', function($scope, Agencies) {

  Agencies.getAgencies().success(function(response) {
    $scope.agencies = response;
  });

});

app.controller('addAgencyCtrl', function($scope, Agencies) {

  Agencies.getAgencies().success(function(response) {
    $scope.agencies = response;
  });

});


app.controller('serviceCtrl', function($scope, Services) {

  Services.getServices().success(function(response) {
    $scope.services = response;
  });

});
