(function(){
angular.module('letsrule-db',['ui-devlog'])
.service('db',
  [
    '$http',
    '$q',
    function($http,$q){
      
      var db = this;

      db.load = function(url){
        var q = $q.defer();

        $http.get(url)
        .then( 
          function(res){ // success
            q.resolve(res.data);
          },
          function(){ // failed
            q.reject('Failed to load database from ' + url);
          }
        );

        return q.promise;
      }
    }
  ]);
})()