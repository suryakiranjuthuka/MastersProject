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
  })
  .factory('PublicationsContent', function ($http) {
    return{
      get: function(){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "getPublications"} })
          .then(function(response) {  //success function
            return response.data;
          }, function(response) {     //error function
            return response.data;
        });
      },
      create: function(type, formData){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "create", "type": type, "formData": formData} })
          .then(function(response) {  //success function
            if(response.data.found){
              return response.data._id;
            }else { return false; }
          }, function(response) {     //error function
            console.log(response.data);
        });
      },
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
      },
      delete: function(id, type){
      return $http.get('includes/datasource.php', { params:{"page": "publications", "action": "delete", "id": id, "type": type} })
          .then(function(response) {  //success function
            console.log(response.data);
          }, function(response) {     //error function
            console.log(response.data);
        });
      }
    };
  })
  .factory('GradStudentsContent', function ($http) {
    return{
      get: function(){
      return $http.get('includes/datasource.php', { params:{"page": "gradStudents", "action": "getGradStudents"} })
          .then(function(response) {  //success function
            return response.data;
          }, function(response) {     //error function
            return response.data;
        });
      },
      create: function(type, formData){
      return $http.get('includes/datasource.php', { params:{"page": "gradStudents", "action": "create", "type": type, "formData": formData} })
          .then(function(response) {  //success function
            if(response.data.found){
              return response.data._id;
            }else { return false; }
          }, function(response) {     //error function
            console.log(response.data);
        });
      },
      update: function(type, formData, id){
      return $http.get('includes/datasource.php', { params:{"page": "gradStudents", "action": "update", "type": type, "formData": formData, "id": id} })
          .then(function(response) {  //success function
            console.log(response.data);
          }, function(response) {     //error function
            console.log(response.data);
        });
      },
      delete: function(id, type){
      return $http.get('includes/datasource.php', { params:{"page": "gradStudents", "action": "delete", "id": id, "type": type} })
          .then(function(response) {  //success function
            console.log(response.data);
          }, function(response) {     //error function
            console.log(response.data);
        });
      }
    };
  })
  .factory('GrantActivitiesContent', function ($http) {
    return{
      get: function(){
      return $http.get('includes/datasource.php', { params:{"page": "grantActivities", "action": "getGrantActivities"} })
          .then(function(response) {  //success function
            return response.data;
          }, function(response) {     //error function
            return response.data;
        });
      },
      create: function(formData){
      return $http.get('includes/datasource.php', { params:{"page": "grantActivities", "action": "create", "formData": formData} })
          .then(function(response) {  //success function
            console.log(response);
            if(response.data.found){
              return response.data._id;
            }else { return false; }
          }, function(response) {     //error function
            console.log(response.data);
        });
      },
      update: function(formData, id){
      return $http.get('includes/datasource.php', { params:{"page": "grantActivities", "action": "update", "formData": formData, "id": id} })
          .then(function(response) {  //success function
            console.log(response.data);
          }, function(response) {     //error function
            console.log(response.data);
        });
      },
      delete: function(id){
      return $http.get('includes/datasource.php', { params:{"page": "grantActivities", "action": "delete", "id": id} })
          .then(function(response) {  //success function
            console.log(response.data);
          }, function(response) {     //error function
            console.log(response.data);
        });
      }
    };
  });
  
  