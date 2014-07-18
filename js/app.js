

var app = angular.module('lets-rule', ['letsrule-map']);
        
app.controller('dbCtrl', function($scope, Country){
  $scope.country = new Country(db.countries[0]);
  console.log($scope.country);
});


app.directive('regionInfo', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/region/region.html'
  }
});