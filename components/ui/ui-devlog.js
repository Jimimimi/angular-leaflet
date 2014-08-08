(function(){

angular.module('ui-devlog',[])

.service('devlog', 
  [
    function(){
      var internal = {
        list: function() {
          log.addEvent('Available dev console functions:')

          for (var command in devFunctions){
            log.addEvent('- ' + command.toString());
          };
          
        }
      }
      var descriptions = {
        help: 'Returns the description of a command. --usage: help -command-',
        clear: 'Clears the console',
        test: 'A test function. --usage: test <param1> <param2> '
      }
      var devFunctions = {
        help: function(command) {
          if (command){log.addEvent(descriptions[command])}
            else {return internal.list()};
        },
        clear: function(){
          while (log.events.length > 0){
            log.events.pop(0);
          };
        },
        test: function(param1,param2,param3){
          console.log(param1, param2, param3)
        }
        
      }

      var log = this;
      this.events = [];

      this.addEvent = function(event){
        log.events.push(event);
      };
      
      this.exec = function(input){
        var list = input.split(' ');
        if (devFunctions.hasOwnProperty(list[0])) {
          if (list.length > 1) {
            devFunctions[list.shift()].apply(this,list);
          } else {
            devFunctions[list[0]]();  
          }
          
        } else {
            log.addEvent('*** Error: command not found');
            log.addEvent('- try using the "help" command')
        };  
      }

    }
  ]
)

.directive('devLog', ['devlog', function(){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: {}, // {} = isolate, true = child, false/undefined = no change
    controller: function(devlog,$scope,$element){
      angular.extend($scope, {
        $id : 'Developer console',
        logs : devlog.events,
        txt: '',
        enter: function($event) {
          if ($event.which === 13 && $scope.txt !== '') {
            devlog.exec($scope.txt);
            $scope.txt = ''
          }
          if ($event.which == 27) {
            $scope.isOpen = false;
          }
        },
        isOpen: true
      });
      window.scoper = $scope;
      
    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
    templateUrl: 'components/ui/devlog.html',
    link: function($scope,$element,$attr){
      var pre = $element[0].children[0].children[0];
      $scope.$watch('logs', function(){
        pre.scrollTop = pre.scrollHeight;
      }, true);
    }
  };
}])

})()
