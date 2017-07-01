(function() {
angular.module('webmarkForm', []);
angular.module('webmarkForm', [])
  .component('webmarkForm', {
    templateUrl: 'webmark-form.html',
    controller: function($scope) {
      // webmarkList controller
      $scope.webformDialog = false;
      this.site = {url:'www.example.com'}
      this.cancel = function(){
        $scope.webformDialog = !$scope.webformDialog;
      }
      this.urlGet = function(){
        $scope.webformDialog = true;
      }
    },
    controllerAs: '$wmfm'
  });
}());
