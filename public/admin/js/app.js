var app = angular.module('AdminApp', []);
var surveyApp = angular.module('SurveyApp', []);



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

app.factory('Surveys', function ($http) {

  var surveyApi = {};

  surveyApi.getSurveys = function(){
    return $http({
      method: "GET",
      url: "/api/survey"
    });
  };

  surveyApi.deleteSurvey = function(_id) {
    return $http({
      method: "DELETE",
      url: "/api/survey/" + _id
    });
  };

  surveyApi.postSurvey = function(_id, survey) {
    return $http({
      method: "POST",
      url: "/api/survey/" + _id
    });
  };

  return surveyApi;

});


app.controller('activeSurveyCtrl', function($scope, Surveys) {

  Surveys.getSurveys().success(function(response) {
    $scope.surveys = response;
  });

  $scope.deleteSurvey = function(_id) {
    Surveys.deleteSurvey(_id).success(function(response) {

      for(var i = 0; i < $scope.surveys.length; i++) {
        if($scope.surveys[i]._id === _id) {
          $scope.surveys.splice(i, 1);
          break;
        }
      }

    });
  };

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


surveyApp.controller('surveyControl', function($scope, Surveys) {
  $scope.postSurvey = function(survey_id, survey) {
    Surveys.postSurvey(survey_id, survey).success(function(response) {
      $scope.result = "Your survey was submitted successfully";
    });
  };
});
