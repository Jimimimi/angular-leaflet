(function(){
angular.module('models-company', ['models-produnit']).
        factory('Company', ['$q', 'Pool','ProdUnit', function ($q, pool, ProdUnit) {
            function Inventory(owner) {
                var api;
                var inv = {
                    food: 0,
                    water: 0
                    //etc
                };

                api = {
                    getAll: function () {
                        return inv;
                    },
                    get: function (data) {
                        var q = $q.defer();
                        if (inv[data.product] > 0) {
                            inv[data.product] -= data.amount;
                            q.resolve(true);
                        } else {
                            owner.purchase(data)
                        }
                    },
                    put: function (data) {

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
                this.id = pool.companies.length;
                this.name = data.name;
                this.inventory = new Inventory();
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
                  this.produnits.push(Unit.id);
                };

              pool.companies.push(this)
            }

            return Company;
        }]);
})();