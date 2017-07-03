(function() {
angular.module('webmarkForm', []);
angular.module('webmarkForm', [])
  .component('webmarkForm', {
    templateUrl: 'webmark-form.html',
    controller: webmarkForm,
    controllerAs: '$wmfm'
  })
  webmarkForm.$inject = ['$scope'];
  function webmarkForm($scope) {
    // webmarkList controller
    $scope.webformDialog = false;
    this.site = {url:'www.example.org'}
    this.cancel = function(){
      $scope.webformDialog = !$scope.webformDialog;
    }
    this.urlGet = function(){
      $scope.webformDialog = true;
    }
  }
}());
