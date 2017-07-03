(function() {
angular.module('app', ['templates', 'ngResource', 'webmarkForm', 'wm.service'])
  .component('webmarkList', {
    templateUrl: 'webmark-list.html',
    controller: webmarkList,
    controllerAs: '$wmlt'
  })
  webmarkList.$inject = ['$scope', 'WebMark'];
  function webmarkList($scope, WebMark) {
    // webmarkList controller
    this.webmarks = WebMark.getAll();
    console.log(this.webmarks, 'res');
    this.site = {url:'www.example.xyz'}
  }
}());
