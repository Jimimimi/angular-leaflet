(function(){
  // Event Handler

var module = angular.module('letsrule-eventHandler',
  [
    'TimeSvc'
  ]
)

.controller('eventHandler',
  [
    '$scope',
    'Calendar',

    function($scope,Time){
  
      // Hotkeys
      $scope.hotKeys = function($event){

        function toggleTime(){

          var states = {
            0: function(){Time.stopTime()},
            1: function(){Time.startTime(100)},
            2: function(){Time.startTime(50)},
            3: function(){Time.startTime(25)}
          };

          var current = Time.buttons.active;
          if (current > 0) {
            Time.last = current;
            Time.buttons.active = 0;
            states[0]();
          } else {
            Time.buttons.active = Time.last;
            states[Time.last]();
            Time.last = 0;
          }
        }

        switch ($event.which) {
          case 32: // Spacebar
            toggleTime()
            break
          case 49: // 1
            Time.startTime(100);
            Time.buttons.active = 1;
            break
          case 50: // 2
            Time.startTime(50);
            Time.buttons.active = 2;
            break
          case 51: // 3
            Time.startTime(25);
            Time.buttons.active = 3;
            break
          default:
            console.log($event.which);
        }
      };
    }
  ]
);

})();