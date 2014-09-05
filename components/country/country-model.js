(function(){
  angular.module('models.country', [
    'modules.pool',
    'models.region',
    'models.market'
  ])
  .factory('Country', [
    'Pool',
    'devlog',
    'Region',
    'Market',
  function(Pool,$log,Region, Market) {
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
      data.companies.forEach(function(company){
        self.economy.market.addCompany(company);
      })
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
  }
  ])
})()