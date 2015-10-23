'use strict';

/**
 * @ngdoc overview
 * @name cselApp
 * @description
 * # cselApp
 *
 * Main module of the application.
 */
angular
  .module('cselApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl as home'
      })
      .when('/publications', {
        templateUrl: 'views/publications.html',
        controller: 'PublicationsCtrl as publications'
      })
      .when('/gradStudents', {
        templateUrl: 'views/gradStudents.html',
        controller: 'GradStudentsCtrl as gradStudents'
      })
      .when('/grantActivities', {
        templateUrl: 'views/grantActivities.html',
        controller: 'GrantActivitiesCtrl as grantActivities'
      })
      .when('/contactInfo', {
        templateUrl: 'views/contactInfo.html',
        controller: 'ContactInfoCtrl as contactInfo'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
