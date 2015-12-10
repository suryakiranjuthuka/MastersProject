'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:GrantActivitiesCtrl
 * @description
 * # GrantActivitiesCtrl
 * Controller of the cselApp
 */
angular.module( 'cselApp' )
  .controller( 'GrantActivitiesCtrl', function( GetJsonDataService ) {
    var grantActivities = this;
    //Get the json data from the service($http)
    GetJsonDataService.get().then( function( data ) {
      grantActivities.data = data.grantActivities;
    } );

  } );