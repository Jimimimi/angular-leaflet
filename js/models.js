(function(){
  var module = angular.module('letsrule-models',['ui-devlog']);

  module.factory('POP', function(){
    function POP(data,parent){
      this.poptype = data.poptype;
      this.amount = data.amount;
      this.economy = {
        income: 0,
        expenses: 0,
        savings: 0,
        market: parent.economy.market
      };
    
      this.needs = {
        'basic': {

        },
        'luxury': {

        }
      };

      this.grow = function(){
        this.amount += 100;
      };
      this.consume = function(){
        for (var i in this.needs){
          var total = (this.needs[i] * this.amount);
          var totalcost = (this.economy.market[i].price * total);
          this.economy.market[i].amount -= total;
          this.economy.expenses += totalcost;
          console.log(this.amount +' '+this.poptype+'s from ' + this.location +' consumed ' + (total*1000) +' kgs of '+ i)
        }
      };
    }

    return POP;
  });

  module.factory('City', function(POP){
    function City(data,parent){
      this.name = data.name;
      this.economy = {
        "GDP": 0,
        "inflation": 0,
        "interestRate": 0,
        "market": parent.economy.market
      };
      this.geo = data.geo;
      var self = this;
      var getPops = function(){
        var arr = [];
        for (var i in data.pops){
          var pop = new POP(data.pops[i],self);
          pop.location = self.name;
          arr.push(pop);
        }
        return arr;
      };
      this.POPS = getPops();
    }

    return City;
  });

  module.factory('Region', function(City){
    function Region(data,parent){
      this.name = data.name;
    
      this.economy = {
        "GDP": 0,
        "inflation": 0,
        "interestRate": 0,
        "market": parent.economy.market
      };
      var self = this;
      var getCities = function(){
        var arr = [];

        for (var i in data.cities) {
          
          arr.push(new City(data.cities[i],self));
        }
        return arr;
      };
      this.cities = getCities();

      this.getPops = function(){
        var total = 0;
        for (var i in this.cities){
          for(var j in this.cities[i].POPS)
            total += this.cities[i].POPS[j].amount;
        };
        return total;
      };
    }

    return Region;
  });

  module.factory('Market', function(){
    return function Market(){
      this.companies = [];
      this.products = {};
    };
  });

  module.factory('Country', ['devlog','Market','Region', function($log,Market, Region){
    function Country(data){
      var self = this;
      function getRegions(){
        
        var arr = [];
        for (var i in data.regions) {
          
          var r = new Region(data.regions[i], self);
          r.owner = data.name;
          r.economy.market = self.economy.market;
          arr.push(r);
        }
        return arr;
      }

      this.name = data.name;
      this.economy = {
        market: new Market()
      };
      this.capital = data.capital;
      this.regions = getRegions();
      
      this._loopPOPS = function(cb){
        this.regions.forEach(function(region){
          region.cities.forEach(function(city){
            city.POPS.forEach(function(pop){
              cb(pop);
            })
          })
        })
      };

      $log.addEvent('Loaded country : '+ data.name)
    }

    return Country;
  }])

})();