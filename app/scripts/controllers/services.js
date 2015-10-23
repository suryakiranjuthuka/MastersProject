'use strict';

/**
 * @ngdoc function
 * @name cselApp.service:GetJsonDataService
 * @description
 * # GetJsonDataService
 * service of the cselApp
 */

angular.module('cselApp')
  .factory('GetJsonDataService', function ($http) {
    return{
      get: function(){
      return $http.get('data/data.json')
          .then(function(response) {  //success function
            return response.data;
          }, function(response) {     //error function
            return response.data;
        });
      }
    };
  });

// ----------$http GET Example----------
  // $http.get('scripts/data.json')
  //   .then(function(response) {
  //     home.status = response.status;
  //     home.data = response.data;
  //   }, function(response) {
  //     home.data = response.data || "Request failed";
  //     home.status = response.status;
  // });