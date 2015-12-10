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
  .controller( 'AppCtrl', function( $rootScope, $location, $scope, $compile, $window, $mdToast ) {

    $rootScope.loginButton = function() {
      $( '#loginPage' ).css( {
        "display": "block",
        "opacity": 0
      } );
      $( '#loginPage' ).animate( {
        opacity: 1
      }, 300 );
      $( 'body' ).addClass( "overflow" );
    };

    $rootScope.logoutButton = function() {
      $rootScope.login = false;
      var toastSettings = $mdToast.simple().content( 'Logged Out Successfully!' );
      $mdToast.show( toastSettings );
      window.location.reload();
    };

    $rootScope.login = function( userName, password ) {
      if( userName === "hxu@umassd.edu" && password === "haipingxu" ) {
        $rootScope.login = true;

        $( '#loginPage' ).animate( {
          opacity: 0
        }, 300 );
        $( '#loginPage' ).css( {
          "display": "none",
          "opacity": 0
        } );
        $( 'body' ).removeClass( "overflow" );

        var divTemplate1 = '<md-button ng-click="logoutButton()">logout</md-button>';
        var temp = $compile( divTemplate1 )( $rootScope );
        var myEl = angular.element( document.querySelector( '#login' ) );
        myEl.html( temp );

        var toastSettings = $mdToast.simple().content( 'Logged In Successfully!' );
        $mdToast.show( toastSettings );
      } else if( typeof userName === "undefined" || typeof password === "undefined" ) {
        var toastSettings1 = $mdToast.simple().content( 'Please enter a valid email/password!' );
        $mdToast.show( toastSettings1 );
      } else if( userName !== "hxu@umassd.edu" || password !== "haipingxu" ) {
        console.log( "logged Out" );
        var toastSettings3 = $mdToast.simple().content( 'Invalid Credentials!' );
        $mdToast.show( toastSettings3 );
      }
    };


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

    //On Click of the Nav Tabs Change Active Class
    $( '#navTabs a' ).on( "click", function() {
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