(function(){
var module = angular.module('ui-window',[])
.service('windowManager', ['$q',function($q){
  var manager = this,
    q = $q.defer();

  this.params = {
    isOpen: false,
    content: ''
  };

  this.get = {
    isOpen : function(){
      return manager.params.isOpen;
    },
    content: function(){
      return manager.params.content;
    }
  }
  
  this.observe = function(){
    return q.promise;
  }

  this.set = function(param, content){
    manager.params[param] = content;
    q.notify(manager.params);
  }

  this.toggle = function(){
   if (!manager.isOpen){
      manager.set('isOpen',true);
    } else if (manager.isOpen){
      manager.set('isOpen',false);
    }
  };

}])
.directive('uiWindow', ['windowManager', function(windowManager){
  // Runs during compile
  return {
    // name: '',
    // priority: 1,
    // terminal: true,
    scope: true, // {} = isolate, true = child, false/undefined = no change
    controller: function($scope, $element, $attrs, $transclude) {
      $scope.$id = 'Window Controller'
      $scope.isOpen = windowManager.get.isOpen
      $scope.content = windowManager.get.content
      
    },
    // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
    restrict: 'E',
    // template: '',
    templateUrl: 'components/ui/ui-window.html',
    // replace: true,
    // transclude: true,
    // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
    link: function($scope, iElm, iAttrs, controller) {
    //   windowManager.observe().then(null,null,function(content){
    //     console.log(content)

    //       $scope.isOpen = content.isOpen;
    //       $scope.content = content.content;

    //   });
    }
  };
}]);
})()