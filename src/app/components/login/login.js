angular.module('myApp.login', [])
.controller('loginCtrl',function($scope){
  $scope.vm = {
      formData: {
        email: '',
       	password: ''
      }
  };
});
