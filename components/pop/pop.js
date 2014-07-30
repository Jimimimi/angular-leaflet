(function(){
angular.module('pop-module',[])
.directive('popInfo', [
  function(){
    return {
      restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
      templateUrl: 'components/pop/pop.html',
    };
  }]);
})()