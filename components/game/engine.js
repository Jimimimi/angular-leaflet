(function(){

angular.module('letsrule-engine',['letsrule-db'])
.service('Game', ['Logger',function($log){
  var game = window.game = this;

  game.loadDB = function(db){
    game.db = db;
  };


  $log.addEvent('Game module loaded')
}])
.service('Logger', [function(){
  var log = this;
  this.events = [];
  this.addEvent = function(event){
    log.events.push(event);
  };

}])
.controller('logCtrl', ['Logger','$scope','$element', function($log,$scope,$element){
  angular.extend($scope, {
    logs : $log.events,
    clear: function(){
      while ($scope.logs.length > 0){
        $scope.logs.pop(0);
      };
      $log.addEvent('cleared')
    }
  });

  $scope.$watch('logs', function(){
    $element[0].scrollTop = $element[0].scrollHeight;
  }, true)


}])
.directive('devLog', [function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    // scope: {}, // {} = isolate, true = child, false/undefined = no change
    // controller: function($scope, $element, $attrs, $transclude) {},
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    template: '<pre class="log" ng-controller="logCtrl"><button ng-click="clear()">Clear log</button><li ng-repeat="event in logs track by $index">{{event}}</li></pre>'
  };
}])

.controller('gameCtrl', ['db','Game', function($db,$game){
  game.loadDB($db);
}])
})()