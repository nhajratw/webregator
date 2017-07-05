(function() {
  'use strict';
angular.module('webmarkForm', []);
angular.module('webmarkForm', [])
  .component('webmarkForm', {
    templateUrl: 'webmark-form.html',
    controller: webmarkForm,
    controllerAs: '$wmfm'
  })
  webmarkForm.$inject = ['$scope', 'WebMark'];
  function webmarkForm($scope, WebMark) {
    var $wmfm = this;
    $scope.webformDialog = false;
    $wmfm.cancel = function(urlInput){
      $scope.webformDialog = !$scope.webformDialog;
      $scope.url.input = '';
    }
    $wmfm.urlGet = function(webmark){
      $scope.webformDialog = (webmark.url_input.$valid)? true:false;
      console.log(webmark.url_input, 'the input');
        if ($scope.webformDialog == true){
          $wmfm.loaded = WebMark.getNew(webmark.url_input.$viewValue);
          $wmfm.loaded.$promise.then(function(response){
            console.log(response);
          })

        }
    }// End of urlGet
  }
}());
