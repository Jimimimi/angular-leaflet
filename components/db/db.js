(function(){
angular.module('letsrule-db',[])
.service('db',
  [
    '$http',
    '$rootScope',
    function($http,$scope){
      
      var db = this;

      $http.get('components/db/db.json')
        .then(function(res){
          db.data = res.data;
        })
        .finally(function(){
          console.log('Data loaded correctly')
        });

      db.search = function(query){
        console.log(query);
      }

    }
  ]);
})()