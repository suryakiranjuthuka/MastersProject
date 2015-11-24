'use strict';

/**
 * @ngdoc function
 * @name cselApp.service:GetJsonDataService
 * @description
 * # GetJsonDataService
 * service of the cselApp
 */

angular.module('cselApp')
  .factory('GetHomeContent', function ($http) {
    return{
      get: function(){
      return $http.get('includes/datasource.php', { params:{"page": "home", "action": "getHome"} })
          .then(function(response) {  //success function
            return response.data;
          }, function(response) {     //error function
            return response.data;
        });
      }
    };
  }).factory('GetPublicationsContent', function ($http) {
    return{
      get: function(){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "getPublications"} })
          .then(function(response) {  //success function
            return response.data;
          }, function(response) {     //error function
            return response.data;
        });
      }
    };
  })
  .factory('DeletePublication', function ($http) {
    return{
      delete: function(id, type){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "delete", "id": id, "type": type} })
          .then(function(response) {  //success function
            // console.log(response.data);
          }, function(response) {     //error function
            console.log(response.data);
        });
      }
    };
  })
  .factory('CreatePublication', function ($http) {
    return{
      create: function(type, formData){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "create", "type": type, "formData": formData} })
          .then(function(response) {  //success function
            if(response.data.found){
              return response.data._id;
            }else { return false; }
          }, function(response) {     //error function
            console.log(response.data);
        });
      }
    };
  })
  .factory('UpdatePublication', function ($http) {
    return{
      update: function(type, formData, id){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "update", "type": type, "formData": formData, "id": id} })
          .then(function(response) {  //success function
            console.log(response.data);
            // if(response.data.found){
            //   return response.data._id;
            // }else { return false; }
          }, function(response) {     //error function
            console.log(response.data);
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