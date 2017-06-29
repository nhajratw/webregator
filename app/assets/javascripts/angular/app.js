angular.module('app', ['templates'])
  .component('webmarkList', {
    templateUrl: 'webmark.html',
    controller: function() {
      // webmarkList controller
      this.site = {url:'www.example.com'}
    },
    controllerAs: '$wm'
  });
