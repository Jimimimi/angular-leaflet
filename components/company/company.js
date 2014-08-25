(function(){
angular.module('models-company', ['models-produnit']).
        factory('Company', ['$q', 'Pool','ProdUnit', function ($q, pool, ProdUnit) {
            function Inventory(owner) {
                var api;
                var inv = {

                };

                api = {
                    getAll: function () {
                        return inv;
                    },
                    get: function(need){
                      if (inv[need.name] - need.amount >= 0) {
                        inv[need.name] -= need.amount;
                        console.log( owner.name, 'consumed', need.amount , 'of' , need.name)
                      }
                    },
                    checkNeeds: function(needs){
                      var q = $q.defer();
                      var fulfilled = [];
                      var res;
                      needs.forEach(function(need){
                        if (inv[need.name] >= need.amount) {
                          fulfilled.push(1);
                        } else {
                          //market.search(need).then(success,failure);
                          //success -> purchase -> fulfilled.push(1);
                          //failure -> fulfilled.push(0) -> stop manufacture -> increase demand for need;
                          fulfilled.push(0);
                        }
                      });
                      if (fulfilled.length > 0) {
                         res = fulfilled.reduce(function(a,b){
                          return a + b;
                        });
                      } else {
                        res = 0
                      }
                      if (fulfilled.length === res){
                        q.resolve(true)
                      } else {
                        q.reject(false)
                      }

                      return q.promise;

                    },

                    put: function (data) {
                      inv[data.name] += data.amount;

                    },
                    add: function (product) {
                      if (!inv.hasOwnProperty(product)) {
                        inv[product] = 0;
                      }
                    }
                };

                return api;
            }

            function Company(data, market) {
                var self = this;
                this.id = pool.companies.getLength();
                this.name = data.name;
                this.inventory = new Inventory(this);
                this.market = market;
                this.economy = {
                    cash: 0
                };
                this.produnits = [];
                this.purchase = function (data) {
                    var best = this.market.search(data);
                    best.trade(data);

                };
                this.trade = function (data) {

                };
                this.createProdUnit = function (data) {
                  var Unit = new ProdUnit(data,this);
                  self.produnits.push(Unit.id);
                };

                data.produnits.forEach(function(produnit){
                  self.createProdUnit(produnit);
                });
              pool.companies.add(this)
            }

            return Company;
        }]);
})();