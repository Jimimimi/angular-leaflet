(function(){
angular.module('letsrule-db',['ui-devlog'])
.service('db',
  [
    '$http',
    '$rootScope',
    'devlog',
    function($http,$scope,$log){
      
      var db = this;

      $http.get('components/db/db.json')
        .then(function(res){
          db.data = res.data;
        })
        .finally(function(){
          $log.addEvent('Data loaded correctly')
        });

      db.search = function(query){
        console.log(query);
      }

    }
  ]);
})()