(function(){
var module = angular.module('ui-menu', [])
.directive('uiMenu', [function(){
  return {
    restrict: 'E',
    controller: function($scope){
      angular.extend($scope,{
        id: 'Menu controller'
      });
    },
    templateUrl: 'components/ui/ui-menu.html',
    link: function(scope,element,attr){

    }
  }
}])

})()