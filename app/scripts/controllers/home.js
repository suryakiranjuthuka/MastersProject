'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('HomeCtrl', function (GetJsonDataService) {
    var home = this;
    //Get the json data from the service($http)
    GetJsonDataService.get().then(function(data) {
      home.mainPara = data.home.mainPara;
      home.subParas = data.home.subParas;
    });
    
    // Set the Current Page to Active Nav
    $('.nav li').removeClass('active');
    $('.nav li:nth-child(1)').addClass('active');
  });