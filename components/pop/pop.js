(function(){
  // POP Module

  var module = angular.module('letsrule-POP',[
    
    ] )
  .factory('POP', [function(){
    function POP(popdata) {
      if (popdata) {
        this.setData(popdata);
      }

      this.needs = {
        'basic': {

        },
        'luxury': {

        }
      };
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
  .service('POPManager', ['POP', function(POP){
    var POPManager = {
      _pool: {},
      _retrieveInstance: function(POPId,POPData){
        var instance = this._pool[POPId];

        if (instance) {
          instance.setData(POPData);
        } else {
          instance = new POP(POPData);
          this._pool[POPId] = instance;
        }

        return instance;
      },
      _search: function(POPId){
        return this._pool[POPId];
      },

      getPOP: function(POPId) {
        var deferred = $q.defer();
        var pop = this._search(POPId);
        if (pop) {
          deferred.resolve(pop);
        } 

        return deferred.promise;
      },
      
    }
  }])
  
})();