(function(){
	var module = angular.module('models-produnit', []).
factory('ProdUnit',['Pool',function(pool){
	function ProdUnit(data,owner) {
		this.id = pool.produnits.length;
		this.owner = owner;
		this.mode = data.mode;
		this.produce = data.produce;
		this.manufacture = function(){
			this.owner.inventory.get(this.produce.input);
			this.owner.inventory.put(this.produce.output);
		}


		pool.produnits.push(this);
	}

	return ProdUnit;

}])
})()