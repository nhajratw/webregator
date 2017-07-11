(function() {
  'use strict';
angular.module('webmarkList', []);
angular.module('webmarkList', [])
  .component('webmarkList', {
    templateUrl: 'webmark-list.html',
    controller: webmarkList,
    controllerAs: '$wmlt'
  })
  webmarkList.$inject = ['$scope', '$rootScope', 'WebMark', 'Host', '$window'];
  function webmarkList($scope, $rootScope, WebMark, Host, $window) {
    var $wmlt = this;
    $wmlt.webmarks = WebMark.getAll();
    $rootScope.$on('reloadWebmarks', function (event, data) {
      $wmlt.webmarks = data;
    });

    $wmlt.webmarkGo = function(wmID){
      $window.location = Host + '/webmarks/' + wmID
    }
  }
}());
