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
    open: function(){
      manager.isOpen = true;
    },
    close: function(){
      manager.isOpen = false;
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
    scope: {}, 
    controller: function($scope, $element, $attrs, $transclude) {
      function getTemplate(content_type){
        switch(content_type){
          case 'pop':
            return './components/pop/pop.html'
          case 'city':
            return './components/city/city.html'
          case 'region':
            return './components/region/region.html'
        }
      }
      angular.extend($scope, {
        $id: 'Window controller',
        closeWindow: function(){
          windowManager.close();
        },
        render: function(content){
          windowManager.setContent(content);
        },
        log: function(dat){
          console.log(dat)
        }
        
      });

      $scope.$watch(windowManager.isOpen, function(){
        $scope.isOpen = windowManager.isOpen();
      });
      $scope.$watch(windowManager.getContent, function(){
        $scope.content = windowManager.getContent()
      });
    },
    restrict: 'E',
    templateUrl: 'components/ui/ui-window.html'
  };
}]
)})();
