(function(){
  var module = angular.module('product-module', [])
  .factory('Product', [
    function(data){
      angular.extend(this,{
        name: data.name,
        category: data.category,
        needs: data.needs,
        getNeeds: function(){
          return this.needs;
        }
      });

    }])
  .directive('productInfo', [
    function(){
      return {
        restrict: 'E',
        scope: {},
        controller: function(){
          // to do
        },
        templateUrl: 'components/products/product.html'
      }
    }])
})()