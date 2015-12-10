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
  .module( 'cselApp', [
    'ngAnimate',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
  ] )
  .config( function( $routeProvider ) {
    $routeProvider
      .when( '/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl as home'
      } )
      .when( '/publications', {
        templateUrl: 'views/publications.html',
        controller: 'PublicationsCtrl as publications'
      } )
      .when( '/gradStudents', {
        templateUrl: 'views/gradStudents.html',
        controller: 'GradStudentsCtrl as gradStudents'
      } )
      .when( '/grantActivities', {
        templateUrl: 'views/grantActivities.html',
        controller: 'GrantActivitiesCtrl as grantActivities'
      } )
      .when( '/contactInfo', {
        templateUrl: 'views/contactInfo.html',
        controller: 'ContactInfoCtrl as contactInfo'
      } )
      .otherwise( {
        redirectTo: '/'
      } );
  } )
  .controller( 'AppCtrl', function( $rootScope, $location, $scope, $compile, $window ) {

    var path = function() {
      return $location.path();
    };

    $rootScope.$watch( path, function( newVal, oldVal ) {
      if( newVal === "/" ) {
        $( '#navTabs a' ).removeClass( "active" );
        $( '#navTabs a:nth-child(1)' ).addClass( "active" );

      } else if( newVal === "/publications" ) {
        $( '#navTabs a' ).removeClass( "active" );
        $( '#navTabs a:nth-child(2)' ).addClass( "active" );
      } else if( newVal === "/gradStudents" ) {
        $( '#navTabs a' ).removeClass( "active" );
        $( '#navTabs a:nth-child(3)' ).addClass( "active" );
      } else if( newVal === "/grantActivities" ) {
        $( '#navTabs a' ).removeClass( "active" );
        $( '#navTabs a:nth-child(4)' ).addClass( "active" );
      } else if( newVal === "/contactInfo" ) {
        $( '#navTabs a' ).removeClass( "active" );
        $( '#navTabs a:nth-child(5)' ).addClass( "active" );
      }

    } );
    
    //on Click Mobile Menu
    $rootScope.mobileMenu = function() { 
      $('#navTabs').toggleClass( "displayBlock" );
      $('#navTabs').css({"opacity": 0});
      $('#navTabs').animate({opacity: 1}, 300);
    //  $('body').addClass( "overflow" );
   };

    //On Click of the Nav Tabs Change Active Class
    $( '#navTabs a' ).on( "click", function() {
      $('#navTabs').removeClass( "displayBlock" );
      $( this ).css( {
        'border-size': 0 + 'px'
      } );
      $( '#navTabs a' ).removeClass( "active" );
      $( this ).addClass( "active" );
      $( '#viewContainer' ).css( {
        "display": "none",
        "opacity": 0
      } );
      $( '#viewContainer' ).animate( {
        opacity: 1
      }, 300 );
      $( '#viewContainer' ).css( {
        "display": "block"
      } );
    } );

    $window.onload = function() {
      $( '#navTabs' ).animate( {
        opacity: 1
      }, 300 );
      $( '#viewContainer' ).css( {
        "display": "block"
      } );
      $( '#viewContainer' ).animate( {
        opacity: 1
      }, 300 );
    }

  } );