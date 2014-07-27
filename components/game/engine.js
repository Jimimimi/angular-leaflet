(function(){

angular.module('letsrule-engine',['letsrule-db','ui-devlog','letsrule-models'])
.service('engine', ['devlog','Country',function($log,Country){
  var engine = window.engine = this;

  engine.loadDb = function(db){
    // var q = $q.defer();
    engine.db = db;
    $log.addEvent('Game engine loaded')
    engine.country = new Country(db.data.countries[0]);
    
  };



}])


.controller('gameCtrl', ['db','engine','$timeout', function($db,$engine,$timeout){
  $timeout(function(){
    $engine.loadDb($db);
    
  }, 300)
  
  
}])
})()