

var app = angular.module('lets-rule', 
  [
    'letsrule-map',
    'letsrule-eventHandler',
    'letsrule-engine'
  ]
);
        
app.controller('dbCtrl', function($scope, Game){
  // $scope.country = new Country(db.countries[0]);
  // console.log($scope.country);

  function Factory(){
    this.id = 'fac-' + 1;
    this.completionRate = 0;
  }
  Factory.prototype.constr = function(){

    if (this.completionRate < 100){
        this.completionRate += 1
        console.log('1 day passed')
      } else {
        console.log(this.id + ' has completed construction');
        this.constructed();
      }
  };

  Factory.prototype.startConstruction = function(){
    
    this.constructed = $scope.$on('time:Day',function(e){
      $scope.factory.constr();
    });

  };

  $scope.factory = window.factory = new Factory();
});


app.directive('regionInfo', function(){
  return {
    restrict: 'E',
    templateUrl: 'components/region/region.html'
  }
});