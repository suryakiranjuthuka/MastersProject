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
angular.module( 'cselApp' )
  .controller( 'PublicationsCtrl', function( PublicationsContent, $mdDialog, $mdToast, $rootScope ) {


    // Assign to the local Scope
    var publications = this;


    //GET the json data from the service($http)
    PublicationsContent.get().then( function( data ) {
      var umd09JP = [],
        umd03JP = [],
        umd91JP = [],
        books = [],
        bookChapters = [],
        umd09CP = [],
        umd03CP = [],
        umd91CP = [],
        techReports = [],
        thesisProject = [];

      angular.forEach( data, function( value, key ) {
        if( data[ key ]._type === 'umd09JP' ) {
          umd09JP.push( data[ key ] );
        }
        if( data[ key ]._type === 'umd03JP' ) {
          umd03JP.push( data[ key ] );
        }
        if( data[ key ]._type === 'umd91JP' ) {
          umd91JP.push( data[ key ] );
        }

        if( data[ key ]._type === 'books' ) {
          books.push( data[ key ] );
        }
        if( data[ key ]._type === 'bookChapters' ) {
          bookChapters.push( data[ key ] );
        }

        if( data[ key ]._type === 'umd09CP' ) {
          umd09CP.push( data[ key ] );
        }
        if( data[ key ]._type === 'umd03CP' ) {
          umd03CP.push( data[ key ] );
        }
        if( data[ key ]._type === 'umd91CP' ) {
          umd91CP.push( data[ key ] );
        }

        if( data[ key ]._type === 'techReports' ) {
          techReports.push( data[ key ] );
        }
        if( data[ key ]._type === 'thesisProject' ) {
          thesisProject.push( data[ key ] );
        }
      } );
      //Assign to local Scope
      publications.umd09JP = umd09JP;
      publications.umd03JP = umd03JP;
      publications.umd91JP = umd91JP;

      publications.books = books;
      publications.bookChapters = bookChapters;

      publications.umd09CP = umd09CP;
      publications.umd03CP = umd03CP;
      publications.umd91CP = umd91CP;

      publications.techReports = techReports;
      publications.thesisProject = thesisProject;
    } );



    // CREATE NEW PUBLICATION
    publications.createNew = function( $event, tempType, tempClass, temph2, templabel ) {
      publications.tempType = tempType;
      publications.tempClass = tempClass;
      publications.temph2 = temph2;
      publications.templabel = templabel;
      $mdDialog.show( {
        targetEvent: $event,
        template: '<md-dialog class="md-content-overflow">' +
          '   <h2>{{ temph2 }}</h2>' +
          '  <md-dialog-content>' +
          '    <md-input-container class="md-block">' +
          '      <label>{{ templabel }}</label>' +
          '      <textarea ng-model="formData" columns="1" md-maxlength="450" rows="5"></textarea>' +
          '    </md-input-container>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions class="md-actions">' +
          '    <md-button ng-click="closeDialog()" class="md-primary md-button">cancel</md-button>' +
          '    <md-button ng-click="add()" class="md-button">save</md-button>' +
          '  </md-dialog-actions>' +
          '</md-dialog>',
        locals: {
          type: publications.tempType,
          fClass: publications.tempClass,
          temph2: publications.temph2,
          templabel: publications.templabel
        },
        // controller: 'GreetingController',
        controller: function( $scope, $mdDialog, $compile, PublicationsContent, type, fClass, temph2, templabel ) {
            $scope.type = type;
            $scope.fClass = fClass;
            $scope.temph2 = temph2;
            $scope.templabel = templabel;
            $scope.closeDialog = function() {
              $mdDialog.hide();
            };
            $scope.add = function() {
              PublicationsContent.create( $scope.type, $scope.formData )
                .then( function( id ) {
                  if( id ) {
                    //Dynamically Add an element from 'formData'
                    var divTemplate = '<div class="each">' +
                      '<li class="umdCard">' + $scope.formData + '</li>' +
                      '<div ng-show="login == true" class="editDelete">' +
                      '<i ng-click="editOldR($event,\'' + $scope.type + '\',\'' + $scope.fClass + '\',\'' + $scope.temph2 + '\', \'Edit Data\', \'' + id + '\', \'' + $scope.formData + '\')" class="material-icons edit">edit</i>' +
                      '<i ng-click="deleteR(\'' + id + '\',\'' + type + '\'); removeElementR($event)" class="material-icons delete">delete</i>' +
                      '</div>' +
                      '</div>';
                    var temp = $compile( divTemplate )( $rootScope );
                    var myEl = angular.element( document.querySelector( '#publicationsContent .' + $scope.fClass ) );
                    temp.css( {
                      'opacity': 0
                    } );
                    temp.toggleClass( 'green' );
                    myEl.prepend( temp );
                    temp.animate( {
                      'opacity': 1
                    }, 340, function() {
                      temp.toggleClass( 'green' );
                    } );
                    // create toast settings object
                    var toastSettings = $mdToast.simple().content( 'Created Successfully!' );
                    $mdToast.show( toastSettings );
                  } else {
                    //Can't add the data
                  }
                } );
              //Close the Dialog after sending the data!
              $mdDialog.hide();
            };
          }
          // onComplete: afterShowAnimation
      } );
      // When the 'enter' animation finishes...
      // function afterShowAnimation(scope, element, options) {
      // post-show code here: DOM element focus, etc.
      // }
    };



    //EDIT OLD PUBLICATION
    $rootScope.editOldR = function( $event, tempType, tempClass, temph2, templabel, tempId ) {
      publications.tempType = tempType;
      publications.tempClass = tempClass;
      publications.temph2 = temph2;
      publications.templabel = templabel;
      publications.tempId = tempId;
      publications.tempPoint = $event.target.parentNode.parentNode.children[ 0 ].innerHTML;
      publications.eventTarget = $event.target.parentNode.parentNode.children[ 0 ];
      $mdDialog.show( {
        targetEvent: $event,
        template: '<md-dialog class="md-content-overflow">' +
          '   <h2>{{ temph2 }}</h2>' +
          '  <md-dialog-content>' +
          '    <md-input-container class="md-block">' +
          '      <label>{{ templabel }}</label>' +
          '      <textarea ng-model="tempPoint" columns="1" md-maxlength="450" rows="5"></textarea>' +
          '    </md-input-container>' +
          '  </md-dialog-content>' +
          '  <md-dialog-actions class="md-actions">' +
          '    <md-button ng-click="closeDialog()" class="md-primary md-button">cancel</md-button>' +
          '    <md-button ng-click="update()" class="md-button">save</md-button>' +
          '  </md-dialog-actions>' +
          '</md-dialog>',
        locals: {
          type: publications.tempType,
          fClass: publications.tempClass,
          temph2: publications.temph2,
          templabel: publications.templabel,
          tempId: publications.tempId,
          tempPoint: publications.tempPoint,
          eventTarget: publications.eventTarget
        },
        // controller: 'GreetingController',
        controller: function( $scope, $mdDialog, $compile, PublicationsContent, type, fClass, temph2, tempPoint, eventTarget ) {
            $scope.temph2 = temph2;
            $scope.templabel = templabel;
            $scope.tempId = tempId;
            $scope.tempPoint = tempPoint;
            $scope.eventTarget = eventTarget;

            $scope.closeDialog = function() {
              $mdDialog.hide();
            };
            $scope.update = function() {
              PublicationsContent.update( type, $scope.tempPoint, $scope.tempId )
                .then( function() {
                  // var parent = eventTarget.parentNode.parentNode.children[0];
                  angular.element( eventTarget ).text( $scope.tempPoint );
                  // create toast settings object
                  var toastSettings = $mdToast.simple().content( 'Updated Successfully!' );
                  $mdToast.show( toastSettings );
                } );
              //Close the Dialog after sending the data!
              $mdDialog.hide();
            };
          }
          // onComplete: afterShowAnimation
      } );
      // When the 'enter' animation finishes...
      // function afterShowAnimation(scope, element, options) {
      // post-show code here: DOM element focus, etc.
      // }
    };



    //DELETE Publication
    publications.delete = function( a, b ) { //For normal operations
      PublicationsContent.delete( a, b );
    };
    $rootScope.deleteR = function( a, b ) { //For operating from a different controller
      PublicationsContent.delete( a, b );
    };

    publications.removeElement = function( $event ) { //For normal operations
      var temp = angular.element( $event.target.parentNode.parentNode );
      temp.toggleClass( 'red' );
      temp.animate( {
        'opacity': 0
      }, function() {
        temp.animate( {
          'height': 0 + 'px',
          'margin': 0
        }, 'fast' );
      } );
      // create toast settings object
      var toastSettings = $mdToast.simple().content( 'Deleted Successfully!' );
      $mdToast.show( toastSettings );
    };
    $rootScope.removeElementR = function( $event ) { //For operating from a different controller
      var temp = angular.element( $event.target.parentNode.parentNode );
      temp.toggleClass( 'red' );
      temp.animate( {
        'opacity': 0
      }, function() {
        temp.animate( {
          'height': 0 + 'px',
          'margin': 0
        }, 'fast' );
      } );
      // create toast settings object
      var toastSettings = $mdToast.simple().content( 'Deleted Successfully!' );
      $mdToast.show( toastSettings );
    };



    /*---------- Scroll to link ----------*/
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
        if( $( window ).scrollTop() > navpos.top ) {
          $( '#sideNav' ).addClass( 'fixed' );
        } else {
          $( '#sideNav' ).removeClass( 'fixed' );
        }
      } );
    } );

  } );