'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:PublicationsCtrl
 * @description
 * # PublicationsCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('PublicationsCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // Set the Current Page to Active Nav
    $('.nav li').removeClass('active');
    $('.nav li:nth-child(2)').addClass('active');
  });
