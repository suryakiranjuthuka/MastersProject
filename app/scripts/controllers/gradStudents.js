'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:GradStudentsCtrl
 * @description
 * # GradStudentsCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('GradStudentsCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    // Set the Current Page to Active Nav
    $('.nav li').removeClass('active');
    $('.nav li:nth-child(3)').addClass('active');
  });
