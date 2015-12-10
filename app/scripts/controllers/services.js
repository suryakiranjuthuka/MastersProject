'use strict';

/**
 * @ngdoc function
 * @name cselApp.service:GetJsonDataService
 * @description
 * # GetJsonDataService
 * service of the cselApp
 */

angular.module( 'cselApp' )
  .factory( 'GetJsonDataService', function( $http ) {
    return {
      get: function() {
        return $http.get( 'data/data.json' )
          .then( function( response ) { //success function
            return response.data;
          }, function( response ) { //error function
            return response.data;
          } );
      }
    };
  } );