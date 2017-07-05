(function() {
  'use strict';
angular.module('webmarkList', []);
angular.module('webmarkList', [])
  .component('webmarkList', {
    templateUrl: 'webmark-list.html',
    controller: webmarkList,
    controllerAs: '$wmlt'
  })
  webmarkList.$inject = ['$scope', 'WebMark'];
  function webmarkList($scope, WebMark) {
    // webmarkList controller
    this.webmarks = WebMark.getAll();
  }
}());
