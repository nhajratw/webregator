(function() {
  'use strict';
angular.module('webmarkForm', []);
angular.module('webmarkForm', [])
  .component('webmarkForm', {
    templateUrl: 'webmark-form.html',
    controller: webmarkForm,
    controllerAs: '$wmfm'
  })
  webmarkForm.$inject = ['$scope', '$rootScope', 'WebMark', '_'];
  function webmarkForm($scope, $rootScope, WebMark, _) {
    var $wmfm = this;
    $scope.webformDialog = false;

    $wmfm.cancel = function(urlInput){
      $scope.webformDialog = !$scope.webformDialog;
      $wmfm.errorUrl = true;
      $scope.url.input = '';
    }
    $wmfm.urlGet = function(webmark){
      $scope.webformDialog = (webmark.url_input.$valid)? true:false;
        if ($scope.webformDialog == true){
          $wmfm.errorUrl = false;
          $wmfm.loaded = WebMark.getNew(webmark.url_input.$viewValue);
          $wmfm.loaded.$promise.then(function(response){
            var htags = [];
            angular.forEach(response.htags, function(value, key) {
              this.push('<h3>' + value.content + '</h3>')
            }, htags);
            var atags = [];
            angular.forEach(response.atags, function(value, key) {
              this.push('<a href="' + value.a_link + '">' + value.a_link +'</a><br>')
            }, atags);
            var combo = htags.concat(atags);
            $scope.url.content = combo.join("");
          }, function(error){
            $wmfm.errorUrl = true;
          })

        }
    }// End of urlGet()
    $wmfm.saveUrl =function(url) {
      var entryObj = {url:url.input, content: url.content}
      WebMark.saveUrl(entryObj).$promise.then(function(response){
        $scope.webformDialog = false;
        $scope.url.input = '';
        $scope.all = WebMark.getAll().$promise.then(function(response){
          $rootScope.$broadcast('reloadWebmarks', response)
        });


      }, function(errors){
          console.log('Errors on saveUrl', errors);
          $wmfm.errors = true;
        });
    }// END of saveUrl()

  }// END of webmarkForm()
}());
