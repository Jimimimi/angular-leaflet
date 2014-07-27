(function(){

angular.module('letsrule-engine',['letsrule-db','ui-devlog'])
.service('Game', [function($log){
  var game = window.game = this;

  game.loadDB = function(db){
    game.db = db;
  };


  // $log.addEvent('Game module loaded')
}])


.controller('gameCtrl', ['db','Game', function($db,$game){
  game.loadDB($db);
}])
})()