var app = angular.module('SurveyApp', []);

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
