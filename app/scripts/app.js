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
    'ngSanitize',
    'ngMaterial'
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
  })
    .controller('AppCtrl', function ($rootScope, $location, $scope, $compile) {

        var path = function() { return $location.path(); };

        $rootScope.$watch(path, function(newVal, oldVal){

            var element = $( "#mainTabs" );

            if(newVal == "/"){
                $( "#mainTabs" ).attr( "md-selected", "0" );
            //           console.log(0);
            }else if(newVal == "/publications"){
                $( "#mainTabs" ).attr( "md-selected", "1" );
            //           console.log(1);
            }else if(newVal == "/gradStudents"){
                $( "#mainTabs" ).attr( "md-selected", "2" );
            //           console.log(2);
            }else if(newVal == "/grantActivities"){
                $( "#mainTabs" ).attr( "md-selected", "3" );
            //           console.log(3);
            }else if(newVal == "/contactInfo"){
                $( "#mainTabs" ).attr( "md-selected", "4" );
            //           console.log(4);
            };

            //To Recompile the element's it chnages its active state on direct URL
    //            $compile(element)($scope);

            $('#home').on("click", function(){
                $location.url('/');
            });
            $('#publications').on("click", function(){
                $location.url('/publications');
            });
            $('#gradStudents').on("click", function(){
                $location.url('/gradStudents');
            });
            $('#grantActivities').on("click", function(){
                $location.url('/grantActivities');
            });
            $('#contactInfo').on("click", function(){
                $location.url('/contactInfo');
            });
    });
    


    
});
    

    
    
    
