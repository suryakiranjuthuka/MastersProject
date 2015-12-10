'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:ContactInfoCtrl
 * @description
 * # ContactInfoCtrl
 * Controller of the cselApp
 */
angular.module( 'cselApp' )
  .controller( 'ContactInfoCtrl', function( GetJsonDataService ) {
    var contactInfo = this;
    //Get the json data from the service($http)
    GetJsonDataService.get().then( function( data ) {
      contactInfo.director = data.contactInfo.director;
      contactInfo.staff = data.contactInfo.staff;
      contactInfo.location = data.contactInfo.location;
    } );



  } );