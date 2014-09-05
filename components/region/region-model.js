(function(){
  angular.module('models.region', ['models.city'])
  .factory('Region',[
  'Pool',
  'City',
  function (Pool,City) {
    function Region(data,parent){
      this.id = data.id;
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

      Pool.regions.add(this);
    }

    return Region;
  }
  ])
})()