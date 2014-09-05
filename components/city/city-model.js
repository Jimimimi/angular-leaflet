(function(){
  angular.module('models.city', ['models.pop'])
  .factory('City', [
    'Pool',
    'POP',
  function(Pool, POP){
    function City(data, parent){
      this.id = Pool.cities.getLength();
      this.name = data.name;
      this.economy = {
        "GDP": 0,
        "inflation": 0,
        "interestRate": 0,
        "market": parent.economy.market
      };
      this.geo = data.geo;
      var self = this;
      this.growth = {
        amount: 0,
        factors: function(){
          var factors = {
            immigration: country.get('immigration'),
            popGrowth: country.get('popGrowth'),
            avgWage: self.get('avgWage')
          };

        },
        effects: function(){
          housing: 0 //formula to calculate housing shortage
        }
      };
      var getPops = function(){
        var arr = [];
        for (var i in data.pops){
          var dat = data.pops[i];
          dat.economy = {
            income: 0,
            expenses: 0,
            savings: 0,
            market: self.economy.market
          };
          var pop = new POP(dat);
          pop.migrate(self.name);
          arr.push(pop);
        }
        return arr;
      };
      this.POPS = getPops();
      this.getPopulation = function(){
        var amount = 0;
        this.POPS.forEach(function(pop){
          amount += pop.amount;
        })
        return amount;
      }
      Pool.cities.add(this);
    }

    return City;
  }
  ])
})()