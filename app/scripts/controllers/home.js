'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:HomeCtrl
 * @description
 * # HomeCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('HomeCtrl', function (GetHomeContent) {
    var home = this;
    //Get the json data from the service($http)
    GetHomeContent.get().then(function(data) {
      home.mainPara = data[1]._source.mainPara;
      home.subParas = data[0]._source.subParas;
    });
    
    
  });