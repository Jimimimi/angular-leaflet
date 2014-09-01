(function() {
var module = angular.module('model-produnit',[])
.factory('ProdUnit',
  [
    function(){
      function createInventory(needs){
        for (var i in needs){
          Inventory[needs[i]] = 0;
        }
        return Inventory;
      }

      return function ProductionUnit(data,company){
        this.id = Pool.produnits.length;
        this.company = company;
        this.mode = data.mode;
        this.product = Pool.search('products',data.product);
        this.inventory = createInventory(this.product.needs);
        this.efficiency = {
          purchasing: 1,
          productivity: 1,
          sales: 1
        };

  };
}])
})()