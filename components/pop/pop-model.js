(function(){
  // POP Module

  var module = angular.module('models.pop',[
    'modules.pool'
    ] )
  .factory('POP', ['Pool',function(Pool){
    function POP(popdata) {
      if (popdata) {
        this.setData(popdata);
      }
      this.id = Pool.POPS.getLength();

      this.needs = {
        'basic': {

        },
        'luxury': {

        }
      };

      Pool.POPS.add(this);
    };

    POP.prototype = {
      setData: function(popdata) {
        angular.extend(this, popdata);
      },
      grow: function(amount){
        this.population += amount
      },
      migrate: function(cityId) {
        this.location = cityId;
      }
    };

    return POP;

  }])
  
})();