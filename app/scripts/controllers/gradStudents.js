'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:GradStudentsCtrl
 * @description
 * # GradStudentsCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('GradStudentsCtrl', function (GradStudentsContent, $mdDialog, $mdToast, $rootScope) {
    
    // Assign to the local Scope
    var gradStudents = this;
    
    
    //GET the json data from the service($http)
    GradStudentsContent.get().then(function(data) {
      var mastersThesisUnder = [], mastersProjectUnder = [], phdDissertationUnder = [], capstoneProjectSupervised = [], mastersThesisCommittee = [], mastersProjectCommittee = [], phdDissertationCommittee = [];
      
      angular.forEach(data, function(value, key) {
        if( data[key]._type === 'mastersThesisUnder' ){ mastersThesisUnder.push(data[key]); }
        if( data[key]._type === 'mastersProjectUnder' ){ mastersProjectUnder.push(data[key]); }
        if( data[key]._type === 'phdDissertationUnder' ){ phdDissertationUnder.push(data[key]); }
        if( data[key]._type === 'capstoneProjectSupervised' ){ capstoneProjectSupervised.push(data[key]); }
        if( data[key]._type === 'mastersThesisCommittee' ){ mastersThesisCommittee.push(data[key]); }
        if( data[key]._type === 'mastersProjectCommittee' ){ mastersProjectCommittee.push(data[key]); }
        if( data[key]._type === 'phdDissertationCommittee' ){ phdDissertationCommittee.push(data[key]); }
      });

      //Assign to local Scope
      gradStudents.mastersThesisUnder = mastersThesisUnder;
      gradStudents.mastersProjectUnder = mastersProjectUnder; 
      gradStudents.phdDissertationUnder = phdDissertationUnder;
      gradStudents.capstoneProjectSupervised = capstoneProjectSupervised;
      gradStudents.mastersThesisCommittee = mastersThesisCommittee;
      gradStudents.mastersProjectCommittee = mastersProjectCommittee;
      gradStudents.phdDissertationCommittee = phdDissertationCommittee;
    });



    // CREATE NEW GRAD STUDENT
    gradStudents.createNew = function($event, tempType, tempClass, temph2, templabel) {
      gradStudents.tempType = tempType;
      gradStudents.tempClass = tempClass;
      gradStudents.temph2 = temph2;
      gradStudents.templabel = templabel;
        $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog class="md-content-overflow">' +
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
            locals: { type: gradStudents.tempType, fClass: gradStudents.tempClass, temph2: gradStudents.temph2, templabel: gradStudents.templabel },
          // controller: 'GreetingController',
          controller: function ($scope, $mdDialog, $compile, GradStudentsContent, type, fClass, temph2, templabel) {
            $scope.type = type;
            $scope.fClass = fClass;
            $scope.temph2 = temph2;
            $scope.templabel = templabel;
            $scope.closeDialog = function() {
              $mdDialog.hide();
            };
            $scope.add = function() {
              GradStudentsContent.create($scope.type, $scope.formData)
              .then(function(id) {
                  if(id){
                    //Dynamically Add an element from 'formData'
                    var divTemplate = '<div class="each">' +
                    '<li class="umdCard">'+ $scope.formData +'</li>' +
                    '<div class="editDelete">' +
                      '<i ng-click="editOldRG($event,\''+ $scope.type +'\',\''+ $scope.fClass +'\',\''+ $scope.temph2 +'\', \'Edit Data\', \''+ id +'\', \''+ $scope.formData +'\')" class="material-icons edit">edit</i>' +
                      '<i ng-click="deleteRG(\''+ id +'\',\''+ type +'\'); removeElementRG($event)" class="material-icons delete">delete</i>' +
                    '</div>' +
                    '</div>' ;
                    var temp = $compile(divTemplate)($rootScope);
                    var myEl = angular.element( document.querySelector( '#gradStudentsContent .' + $scope.fClass ) );
                    temp.css({'opacity': 0}); 
                    temp.toggleClass('green');
                    myEl.prepend(temp);   
                    temp.animate({ 'opacity': 1}, 340, function(){
                      temp.toggleClass('green');
                    });
                    // create toast settings object
                    var toastSettings = $mdToast.simple().content('Created Successfully!');
                    $mdToast.show(toastSettings);
                  }else{ 
                    //Can't add the data
                  }
              });
              //Close the Dialog after sending the data!
              $mdDialog.hide();
            };
          }
          // onComplete: afterShowAnimation
        });
        // When the 'enter' animation finishes...
        // function afterShowAnimation(scope, element, options) {
           // post-show code here: DOM element focus, etc.
        // }
    };
    
    
    
    //EDIT OLD PUBLICATION
    $rootScope.editOldRG = function($event, tempType, tempClass, temph2, templabel, tempId) {
      gradStudents.tempType = tempType;
      gradStudents.tempClass = tempClass;
      gradStudents.temph2 = temph2;
      gradStudents.templabel = templabel;
      gradStudents.tempId = tempId;
      gradStudents.tempPoint = $event.target.parentNode.parentNode.children[0].innerHTML;
      gradStudents.eventTarget = $event.target.parentNode.parentNode.children[0];
        $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog class="md-content-overflow">' +
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
            locals: { type: gradStudents.tempType, fClass: gradStudents.tempClass, temph2: gradStudents.temph2, templabel: gradStudents.templabel, tempId: gradStudents.tempId, tempPoint: gradStudents.tempPoint, eventTarget: gradStudents.eventTarget },
          // controller: 'GreetingController',
          controller: function ($scope, $mdDialog, $compile, GradStudentsContent, type, fClass, temph2, tempPoint, eventTarget) {
            $scope.temph2 = temph2;
            $scope.templabel = templabel;
            $scope.tempId = tempId;
            $scope.tempPoint = tempPoint;
            $scope.eventTarget = eventTarget;
            
            $scope.closeDialog = function() {
              $mdDialog.hide();
            };
            $scope.update = function() {
              GradStudentsContent.update(type, $scope.tempPoint, $scope.tempId)
              .then(function() {
                // var parent = eventTarget.parentNode.parentNode.children[0];
                angular.element(eventTarget).text($scope.tempPoint);
                // create toast settings object
                var toastSettings = $mdToast.simple().content('Updated Successfully!');
                $mdToast.show(toastSettings);
              });
              //Close the Dialog after sending the data!
              $mdDialog.hide();
            };
          }
          // onComplete: afterShowAnimation
        });
        // When the 'enter' animation finishes...
        // function afterShowAnimation(scope, element, options) {
           // post-show code here: DOM element focus, etc.
        // }
    };
    
    
    
    //DELETE Publication
    gradStudents.delete = function(a, b){ //For normal operations
        GradStudentsContent.delete(a, b);
    };
    $rootScope.deleteRG = function(a, b){  //For operating from a different controller
        GradStudentsContent.delete(a, b);
    };
    
    gradStudents.removeElement = function($event){  //For normal operations
      var temp = angular.element($event.target.parentNode.parentNode);
      temp.toggleClass('red');
      temp.animate({ 'opacity': 0}, function(){
        temp.animate({'height': 0+'px', 'margin': 0}, 'fast');
      });
      // create toast settings object
      var toastSettings = $mdToast.simple().content('Deleted Successfully!');
      $mdToast.show(toastSettings);
    };
    $rootScope.removeElementRG = function($event){ //For operating from a different controller
      var temp = angular.element($event.target.parentNode.parentNode);
      temp.toggleClass('red');
      temp.animate({ 'opacity': 0}, function(){
        temp.animate({'height': 0+'px', 'margin': 0}, 'fast');
      });
      // create toast settings object
      var toastSettings = $mdToast.simple().content('Deleted Successfully!');
      $mdToast.show(toastSettings);
    };

    
    
    /*---------- Scroll to link ----------*/
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