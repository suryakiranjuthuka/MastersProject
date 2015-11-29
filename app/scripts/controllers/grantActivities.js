'use strict';

/**
 * @ngdoc function
 * @name cselApp.controller:GrantActivitiesCtrl
 * @description
 * # GrantActivitiesCtrl
 * Controller of the cselApp
 */
angular.module('cselApp')
  .controller('GrantActivitiesCtrl', function (GrantActivitiesContent, $mdDialog, $mdToast, $rootScope) {
    
    var grantActivities = this;
    //Get the json data from the service($http)
    GrantActivitiesContent.get().then(function(data) {
      grantActivities.data = data;
    });



    // CREATE NEW GRANT ACTIVITY
    grantActivities.createNew = function($event) {
        $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog class="md-content-overflow">' +
            '   <h2>Funding and Grant Activities</h2>' +
            '  <md-dialog-content>' +
            '    <md-input-container class="md-block">' +
            '      <label>Add Funding/Grant Activities</label>' +
            '      <textarea ng-model="formData" columns="1" md-maxlength="450" rows="5"></textarea>' +
            '    </md-input-container>' +
            '  </md-dialog-content>' +            
            '  <md-dialog-actions class="md-actions">' +
            '    <md-button ng-click="closeDialog()" class="md-primary md-button">cancel</md-button>' +
            '    <md-button ng-click="add()" class="md-button">save</md-button>' +
            '  </md-dialog-actions>' +
            '</md-dialog>',
            locals: {},
          // controller: 'GreetingController',
          controller: function ($scope, $mdDialog, $compile, GrantActivitiesContent) {
            $scope.closeDialog = function() {
              $mdDialog.hide();
            };
            $scope.add = function() {
              GrantActivitiesContent.create($scope.formData)
              .then(function(id) {
                  if(id){
                    //Dynamically Add an element from 'formData'
                    var divTemplate = '<div class="each">' +
                    '<li class="grantPara">'+ $scope.formData +'</li>' +
                    '<div ng-show="login == true" class="editDelete">' +
                      '<i ng-click="editOldRGF($event,\''+ id +'\')" class="material-icons edit">edit</i>' +
                      '<i ng-click="deleteRGF(\''+ id +'\'); removeElementRGF($event)" class="material-icons delete">delete</i>' +
                    '</div>' +
                    '</div>' ;
                    var temp = $compile(divTemplate)($rootScope);
                    var myEl = angular.element( document.querySelector( '#grantActivities') );
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
    $rootScope.editOldRGF = function($event, tempId) {
      grantActivities.tempId = tempId;
      grantActivities.tempPoint = $event.target.parentNode.parentNode.children[0].innerHTML;
      grantActivities.eventTarget = $event.target.parentNode.parentNode.children[0];
        $mdDialog.show({
          targetEvent: $event,
          template:
            '<md-dialog class="md-content-overflow">' +
            '   <h2>Funding and Grant Activities</h2>' +
            '  <md-dialog-content>' +
            '    <md-input-container class="md-block">' +
            '      <label>Edit Funding/Grant Activity</label>' +
            '      <textarea ng-model="tempPoint" columns="1" md-maxlength="450" rows="5"></textarea>' +
            '    </md-input-container>' +
            '  </md-dialog-content>' +            
            '  <md-dialog-actions class="md-actions">' +
            '    <md-button ng-click="closeDialog()" class="md-primary md-button">cancel</md-button>' +
            '    <md-button ng-click="update()" class="md-button">save</md-button>' +
            '  </md-dialog-actions>' +
            '</md-dialog>',
            locals: { tempId: grantActivities.tempId, tempPoint: grantActivities.tempPoint, eventTarget: grantActivities.eventTarget },
          // controller: 'GreetingController',
          controller: function ($scope, $mdDialog, $compile, GrantActivitiesContent, tempPoint, eventTarget) {
            $scope.tempId = tempId;
            $scope.tempPoint = tempPoint;
            $scope.eventTarget = eventTarget;
            
            $scope.closeDialog = function() {
              $mdDialog.hide();
            };
            $scope.update = function() {
              GrantActivitiesContent.update($scope.tempPoint, $scope.tempId)
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



    //DELETE Grant
    grantActivities.delete = function(a, b){ //For normal operations
        GrantActivitiesContent.delete(a, b);
    };
    $rootScope.deleteRGF = function(a, b){  //For operating from a different controller
        GrantActivitiesContent.delete(a, b);
    };
    
    grantActivities.removeElement = function($event){  //For normal operations
      var temp = angular.element($event.target.parentNode.parentNode);
      temp.toggleClass('red');
      temp.animate({ 'opacity': 0}, function(){
        temp.animate({'height': 0+'px', 'margin': 0}, 'fast');
      });
      // create toast settings object
      var toastSettings = $mdToast.simple().content('Deleted Successfully!');
      $mdToast.show(toastSettings);
    };
    $rootScope.removeElementRGF = function($event){ //For operating from a different controller
      var temp = angular.element($event.target.parentNode.parentNode);
      temp.toggleClass('red');
      temp.animate({ 'opacity': 0}, function(){
        temp.animate({'height': 0+'px', 'margin': 0}, 'fast');
      });
      // create toast settings object
      var toastSettings = $mdToast.simple().content('Deleted Successfully!');
      $mdToast.show(toastSettings);
    };




  });
