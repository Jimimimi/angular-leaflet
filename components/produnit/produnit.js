(function(){
angular.module('models-produnit', []).
factory('ProdUnit',['Pool',function(pool){
	function ProdUnit(data,owner) {
    var self = this,
        product = pool.products.find(data.produce);

    function setInv(){
      owner.inventory.add(self.produce);
      product.needs.forEach(function(need){
        owner.inventory.add(need.name);
      })
    }

    function init(){
      pool.produnits.add(this); // add to Pool after init;
      setInv(); // add needs and product to owner's inventory
    }
    // Model
    //noinspection JSUnusedGlobalSymbols
    angular.extend(this, {
      id: pool.produnits.getLength(),
      owner: owner,
      mode: data.mode,
      produce: data.produce,
      efficiency: { // TODO pull these from BASE_VALUES
        input: 0.01,
        output: 0.01
      },
      manufacture: function(){
        // For each product in product.recipe
        // Check owner's inventory to see if the amount of stock is enough to fulfill the product's recipe.
        owner.inventory.checkNeeds(product.needs)
        .then(
          function(){ // Has enough of recipe needs
            product.needs.forEach(function(need){ // remove each need from owner's inventory
              owner.inventory.get(need);
            });

            var produced = 1 + self.efficiency.output;
            owner.inventory.put({name:self.produce,amount:produced});
            console.log(owner.name, self.produce, self.mode, 'produced ' + produced + ' tonnes of ' + self.produce);
          },
          function(){ // Doesn't have enough of recipe needs
            console.log('Not enough of needs');
          }
        );
      }
      // TODO upgrade(input/output)
      // TODO changeOwner(owner)
    });

    // INIT

    init();



	}

	return ProdUnit;

}])
})();