(function(){
var module = angular.module('ui-window',[])
.factory('windowManager', [function(){
  var manager = {
    isOpen: false,
    content: ''
  };

  return {
    isOpen: function(){
      return manager.isOpen;
    },
    toggle: function(){
      if (!manager.isOpen){
        manager.isOpen = true;
      } else {
        manager.isOpen = false;
      }
    },
    setContent: function(content){
      manager.content = content;
    },
    getContent: function(){
      return manager.content;
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
      angular.extend($scope, {
        $id: 'Window controller'
        //,
        //isOpen: windowManager.isOpen(),
        //content: windowManager.getContent()
      });

      $scope.$watch(windowManager.isOpen, function(){
        $scope.isOpen = windowManager.isOpen();
      });
      $scope.$watch(windowManager.getContent, function(){
        $scope.content = windowManager.getContent()
      })
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