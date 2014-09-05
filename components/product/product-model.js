(function(){
  angular.module('models.product', [])
  .factory('Product', ['Pool', function(Pool) {
    function Product (data) {
      angular.extend(this, {
        name: data.name,
        category: data.category,
        needs: data.needs,
        recipe: data.recipe,
        getNeeds: function () {
          return this.needs;
        }
      });
      Pool.products.add(this);
    };

    return Product;
  }]);
})()