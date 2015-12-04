'use strict';

angular.module('mastersProjectApp')
  .controller('ProjectCtrl', function ($scope) {
    $scope.students = [{
      'name': 'Surya',
      'Phone': 7743650338
    },{
      'name': 'Carissa',
      'Phone': 9849663157
    },{
      'name': 'Surya',
      'Phone': 9030067149
    }];
  });
  
  
  
  
//CONTROLLER  
angular.module('mastersProjectApp')
  .controller('ProjectCtrl',function($scope, GetDatabaseContent){
    $scope.students = GetDatabaseContent.data;
  });

  
//SERVICE  
angular.module('mastersProjectApp')
  .factory('GetDatabaseContent', function() {
    //This object will contain the data of this service
    var GetDatabaseContent = {};
    
    return GetDatabaseContent;
  });
      
      
      
      
    
    
    