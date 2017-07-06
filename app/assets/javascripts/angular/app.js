(function() {
  'use strict';
angular.module('app', [
  'templates',
  'ngResource',
  'webmarkForm',
  'webmarkList',
  'wm.service'
])
  .config(["$httpProvider", function($httpProvider) {
    var csrfToken = document.getElementsByName("csrf-token")[0].content
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = csrfToken;
  // CSRF protection. Access to X-CSRF-Token for Angular
  }])
  // ADD Lodash
  .constant('_', window._)
}());
