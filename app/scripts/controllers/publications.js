'use strict';

// Set the Current Page to Active Nav
//$( "#mainTabs" ).attr( "md-selected", 1 );

/**
 * @ngdoc function
 * @name cselApp.controller:PublicationsCtrl
 * @description
 * # PublicationsCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('PublicationsCtrl', function (GetJsonDataService) {
    var publications = this;
    //Get the json data from the service($http)
    GetJsonDataService.get().then(function(data) {
        publications.umd09JP = data.publications.umd09JP;
        publications.umd03JP = data.publications.umd03JP; 
        publications.umd91JP = data.publications.umd91JP;
        
        publications.books = data.publications.books;
        publications.bookChapters = data.publications.bookChapters;
        
        publications.umd09CP = data.publications.umd09CP;
        publications.umd03CP = data.publications.umd03CP;
        publications.umd91CP = data.publications.umd91CP;
        
        publications.techReports = data.publications.techReports;
        publications.thesisProject = data.publications.thesisProject;
        });
    
    
        /*-- Scroll to link --*/
    $(function(){
            /*-- Scroll to link --*/
            $('.scroller-link').click(function(e){
                console.log("click");
                e.preventDefault(); //Don't automatically jump to the link
                var id;
                id = $(this).attr('href').replace('#', ''); //Extract the id of the element to jump to
                $('html,body').animate({scrollTop: $("#"+id).offset().top - 40},'normal');
            });
        
        //For Fixed Nav after offset
          var navpos = $('#viewContainer').offset();
          //console.log(navpos.top);
          $(window).bind('scroll', function() {
            if ($(window).scrollTop() > navpos.top) {
              $('#sideNav').addClass('fixed');
            } else {
              $('#sideNav').removeClass('fixed');
            }
          });
        
        
    });
    
});