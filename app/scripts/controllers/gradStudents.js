'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:GradStudentsCtrl
 * @description
 * # GradStudentsCtrl
 * Controller of the cselApp
 */
angular.module( 'cselApp' )
  .controller( 'GradStudentsCtrl', function( GetJsonDataService ) {
    var gradStudents = this;
    //Get the json data from the service($http)
    GetJsonDataService.get().then( function( data ) {
      gradStudents.mastersThesisUnder = data.gradStudents.mastersThesisUnder;
      gradStudents.mastersProjectUnder = data.gradStudents.mastersProjectUnder;
      gradStudents.phdDissertationUnder = data.gradStudents.phdDissertationUnder;
      gradStudents.capstoneProjectSupervised = data.gradStudents.capstoneProjectSupervised;
      gradStudents.mastersThesisCommittee = data.gradStudents.mastersThesisCommittee;
      gradStudents.mastersProjectCommittee = data.gradStudents.mastersProjectCommittee;
      gradStudents.phdDissertationCommittee = data.gradStudents.phdDissertationCommittee;
    } );



    /*-- Scroll to link --*/
    $( function() {
      /*-- Scroll to link --*/
      $( '.scroller-link' ).click( function( e ) {
        console.log( "click" );
        e.preventDefault(); //Don't automatically jump to the link
        var id;
        id = $( this ).attr( 'href' ).replace( '#', '' ); //Extract the id of the element to jump to
        $( 'html,body' ).animate( {
          scrollTop: $( "#" + id ).offset().top - 40
        }, 'normal' );
      } );

      //For Fixed Nav after offset
      var navpos = $( '#viewContainer' ).offset();
      //console.log(navpos.top);
      $( window ).bind( 'scroll', function() {
        if( $( window ).scrollTop() > navpos.top - 8 ) {
          $( '#sideNav' ).addClass( 'fixed' );
        } else {
          $( '#sideNav' ).removeClass( 'fixed' );
        }
      } );
    } );

  } );