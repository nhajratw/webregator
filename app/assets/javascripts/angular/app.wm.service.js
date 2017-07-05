(function() {
  'use strict';
angular.module('wm.service', []);
angular.module('wm.service')
  .service('WebMark', WebMarkService)
  WebMarkService.$inject = ['$resource'];
  function WebMarkService($resource){
    var service = this;
    service.getAll = function(){
      var webmark = $resource('/webmarks.json', {},{
        all: { method: 'GET', isArray: true }
      })
      return webmark.all({}, function(response){
        //Log for testing
        //console.log('all webmarks', response);
      }, function(error){
         console.log('Error getting all webmarks: ', error);
       });
    }; // END of getAll()
    service.getNew = function(urlInput){
      var resource = $resource('/indexer.json?wm_url='+':url', {url: '@url'},{
        content: { method: 'GET', isArray: false }
      })
      return resource.content({url: urlInput}, function(response){
      }, function(error){
        console.log('Error getting new url: ', error);
      });
    }; // END of getNew()
  }

}());
