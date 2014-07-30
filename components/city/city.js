(function(){
angular.module('city-module',[])
.directive('cityInfo',[
  function(){
    return {
      // scope: true,
      restrict: 'E',
      templateUrl: 'components/city/city.html'
    }
  }]);
})()