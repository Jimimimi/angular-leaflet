(function(){
  angular.module('ui-profile', [])
  .directive('uiProfile', function(){
    return {
      restrict: 'E',
      templateUrl: 'components/ui/ui-profile.html',
      scope: true
    }
  })
})()